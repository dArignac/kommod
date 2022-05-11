import axios, { AxiosInstance } from "axios"
import { config } from "../../config"
import { isDev } from "../../helpers"
import { TogglStore } from "../../store"
import { Client, Project, TimeEntry, User } from "../../types"
import { setToBeforeMidnight, setToMidnight, sort } from "../date"
import { TogglTimeEntry, TogglUserResponse } from "./types"

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

  public async fetchUser(): Promise<User> {
    if (isDev() && config.development.networkDelays.fetchUser > 0) {
      await this.sleep(config.development.networkDelays.fetchUser)
    }

    // fetch data
    let { data } = await this.ax.get<TogglUserResponse>("/me", {
      ...this.getAuth(),
      params: { with_related_data: true },
    })

    // FIXME use time_entries to extract task names

    // map data
    const clients = data.data.clients.map((client) => {
      return {
        id: client.id,
        name: client.name,
      } as Client
    })
    const projects = data.data.projects.map((project) => {
      return {
        client: clients.find((client) => client.id === project.cid),
        color: project.hex_color,
        id: project.id,
        name: project.name,
      } as Project
    })
    const user = {
      email: data.data.email,
      id: data.data.id,
    } as User

    // update stores
    TogglStore.update((s) => {
      s.clients = clients
      s.projects = projects
      s.user = user
    })

    return user
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

    const projects = TogglStore.getRawState().projects

    // we map only what we need - adjust tests accordingly
    return (
      data
        .map((entry: TogglTimeEntry) => {
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
        })
        // sort entries
        .sort(sort)
    )
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
