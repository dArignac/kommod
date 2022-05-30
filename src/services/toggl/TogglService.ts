import axios, { AxiosInstance } from "axios"
import { config } from "../../config"
import { isDev } from "../../helpers"
import { BookingStore, TogglStore } from "../../store"
import { Client, Project, TimeEntry, User } from "../../types"
import { formatTime, setToBeforeMidnight, setToMidnight, sortStartStopables } from "../date"
import { TogglCurrentTimeEntryResponse, TogglTimeEntry, TogglUserResponse } from "./types"

export class TogglService {
  private static instance: TogglService
  private ax: AxiosInstance
  private _token = ""

  private constructor(token: string) {
    this.token = token
    this.ax = axios.create({
      baseURL: "https://api.track.toggl.com/api/v8",
    })
  }

  private getAuth() {
    return {
      auth: {
        username: this.token,
        password: "api_token",
      },
    }
  }

  get token() {
    return this._token
  }

  public set token(token: string) {
    this._token = token
  }

  /**
   * Helper to delay the actual network calls. Used for testing loading indicators etc.
   * @param ms delay in milliseconds
   * @returns Promise
   */
  private sleep(ms = 2000): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /**
   * Fetches the user information.
   * @returns User
   */
  public async fetchUser(): Promise<User> {
    if (isDev() && config.development.networkDelays.fetchUser > 0) {
      await this.sleep(config.development.networkDelays.fetchUser)
    }

    // fetch data
    let { data } = await this.ax.get<TogglUserResponse>("/me", {
      ...this.getAuth(),
      params: { with_related_data: true },
    })

    // map data
    const clients = data.data.clients.map((client) => {
      return {
        id: client.id,
        name: client.name,
      } as Client
    })
    const projects = data.data.projects
      .map((project) => {
        return {
          client: clients.find((client) => client.id === project.cid),
          color: project.hex_color,
          id: project.id,
          name: project.name,
        } as Project
      })
      .sort(function (p1, p2) {
        return p1.name.localeCompare(p2.name)
      })
    const tasks = data.data.time_entries.map((time_entry) => time_entry.description)
    const user = {
      email: data.data.email,
      id: data.data.id,
    } as User

    // update stores
    TogglStore.update((s) => {
      s.clients = clients
      s.projects = projects
      s.tasks = tasks
      s.user = user
    })

    return user
  }

  public async fetchActiveTimeEntry(): Promise<TimeEntry | null> {
    let { data } = await this.ax.get<TogglCurrentTimeEntryResponse>("/time_entries/current", {
      ...this.getAuth(),
    })

    if (data.data !== null) {
      const entry = this.mapTimeEntry(data.data, TogglStore.getRawState().projects)

      BookingStore.update((s) => {
        s.day = entry.start
        s.projectId = entry.project.id
        s.timeEntryDescription = entry.description
        s.timEntryId = entry.id
        s.timeStart = formatTime(entry.start)
      })

      return entry
    } else {
      return null
    }
  }

  /**
   * Fetches the time entries of the given day for the user.
   * @param day the day to use
   * @returns list of TimeEntry
   */
  public async fetchTimeEntriesOfDay(day: Date): Promise<TimeEntry[]> {
    if (isDev() && config.development.networkDelays.fetchEntries > 0) {
      await this.sleep(config.development.networkDelays.fetchEntries)
    }

    const { data } = await this.ax.get<TogglTimeEntry[]>("/time_entries", {
      ...this.getAuth(),
      params: { start_date: setToMidnight(day).toISOString(), end_date: setToBeforeMidnight(day).toISOString() },
    })

    return data.map((entry: TogglTimeEntry) => this.mapTimeEntry(entry, TogglStore.getRawState().projects)).sort(sortStartStopables)
  }

  public async stopTimeEntry(id: number): Promise<TimeEntry | null> {
    if (isDev() && config.development.networkDelays.fetchEntries > 0) {
      await this.sleep(config.development.networkDelays.fetchEntries)
    }

    try {
      const { data } = await this.ax.put<{ data: TogglTimeEntry }>(`/time_entries/${id}/stop`, { ...this.getAuth(), params: { id } })

      if (data.data !== null) {
        const entry = this.mapTimeEntry(data.data, TogglStore.getRawState().projects)

        BookingStore.update((s) => {
          s.day = new Date()
          s.projectId = entry.project.id
          s.timeEntryDescription = undefined
          s.timEntryId = undefined
          s.timeStart = undefined
        })

        return entry
      }
    } catch {}
    return null
  }
  // we map only what we need - adjust tests accordingly
  private mapTimeEntry(entry: TogglTimeEntry, projects: Project[]): TimeEntry {
    const project = projects.find((project) => project.id === entry.pid)
    const item = {
      description: entry.description,
      duration: entry.duration,
      id: entry.id,
      project,
      start: new Date(entry.start),
    } as TimeEntry
    if ("stop" in entry) {
      item.stop = new Date(entry.stop)
    }
    return item
  }

  public static getInstance(token: string): TogglService {
    if (!TogglService.instance) {
      TogglService.instance = new TogglService(token)
    } else {
      TogglService.instance.token = token
    }
    return TogglService.instance
  }
}
