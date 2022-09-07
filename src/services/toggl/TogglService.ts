import axios, { AxiosInstance } from "axios"
import { utcToZonedTime } from "date-fns-tz"
import add from "date-fns/add"
import isToday from "date-fns/isToday"
import sub from "date-fns/sub"
import { config } from "../../config"
import { isDev } from "../../helpers"
import { TimeBookingStore, TogglStore } from "../../store"
import { Client, Project, TimeEntry, User, Workspace } from "../../types"
import { formatDate, formatTime, sortStartStopables } from "../date"
import { TogglClient, TogglProject, TogglTimeEntry, TogglUser } from "./types"

export class TogglService {
  private static instance: TogglService
  private ax: AxiosInstance
  private _token = ""

  private constructor(token: string) {
    this.token = token
    this.ax = axios.create({
      baseURL: "https://api.track.toggl.com/api/v9",
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
    let { data } = await this.ax.get<TogglUser>("/me", {
      ...this.getAuth(),
    })

    const user: User = {
      defaultWorkspaceId: data.default_workspace_id,
      email: data.email,
      id: data.id,
    }

    // update store
    TogglStore.update((s) => {
      s.user = user
    })

    return user
  }

  public async fetchClients(workspaceId: number): Promise<Client[]> {
    let { data } = await this.ax.get<TogglClient[]>(`/workspaces/${workspaceId}/clients`, { ...this.getAuth() })

    if (data != null) {
      const clients = data.map((client) => {
        return {
          id: client.id,
          name: client.name,
        } as Client
      })

      TogglStore.update((s) => {
        s.clients = clients
      })

      return clients
    }

    return []
  }

  public async fetchProjects(workspaceId: number): Promise<Project[]> {
    let { data } = await this.ax.get<TogglProject[]>(`/workspaces/${workspaceId}/projects`, { ...this.getAuth() })

    const clients = TogglStore.getRawState().clients

    if (data != null) {
      const projects = data
        .map((project) => {
          const ws: Workspace = {
            id: project.workspace_id,
          }
          return {
            client: clients.find((client) => client.id === project.client_id),
            color: project.color,
            id: project.id,
            name: project.name,
            workspace: ws,
          } as Project
        })
        .sort(function (p1, p2) {
          return p1.name.localeCompare(p2.name)
        })

      TogglStore.update((s) => {
        s.projects = projects
      })

      return projects
    }

    return []
  }

  public async fetchActiveTimeEntry(): Promise<TimeEntry | null> {
    let { data } = await this.ax.get<TogglTimeEntry>("/me/time_entries/current", {
      ...this.getAuth(),
    })

    if (data === null) {
      return null
    } else {
      const entry = this.mapTimeEntry(data, TogglStore.getRawState().projects)

      TimeBookingStore.update((s) => {
        s.day = entry.start
        s.description = entry.description
        s.start = formatTime(entry.start)
        s.entry = entry
        s.projectId = entry.project.id
      })

      return entry
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

    // the time for the date parameters is 00:00:00
    // as the API is incapable of handling timezone and handles the parameters as UTC, we must fetch more data then actually necessary
    // as timezone ranges from -12 to +14 hours, we query the whole day before <day> and one additional day after <day>
    const { data } = await this.ax.get<TogglTimeEntry[]>("/me/time_entries", {
      ...this.getAuth(),
      params: { start_date: formatDate(sub(day, { days: 1 })), end_date: formatDate(add(day, { days: 1 })) },
    })

    // map, filter and sort
    let entries = data
      .map((entry: TogglTimeEntry) => this.mapTimeEntry(entry, TogglStore.getRawState().projects))
      .filter((entry) => isToday(entry.start))
      .sort(sortStartStopables)

    // extract the time entry descriptions as tasks for the store
    let tasks: string[] = []
    entries.forEach((entry) => {
      if (!tasks.includes(entry.description)) {
        tasks.push(entry.description)
      }
    })
    TogglStore.update((s) => {
      s.tasks = s.tasks.concat(tasks)
    })

    return entries
  }

  public async updateTimeEntry(entry: TimeEntry): Promise<TimeEntry | null> {
    try {
      const { data } = await this.ax.put<TogglTimeEntry>(`/workspaces/${entry.project.workspace.id}/time_entries/${entry.id}`, entry, { ...this.getAuth() })

      if (data !== null) {
        return this.mapTimeEntry(data, TogglStore.getRawState().projects)
      }
    } catch {}
    return null
  }

  private mapTimeEntry(entry: TogglTimeEntry, projects: Project[]): TimeEntry {
    const project = projects.find((project) => project.id === entry.project_id)
    const item = {
      description: entry.description,
      duration: entry.duration,
      id: entry.id,
      project,
      start: utcToZonedTime(entry.start, Intl.DateTimeFormat().resolvedOptions().timeZone),
    } as TimeEntry
    if ("stop" in entry && entry.stop !== null) {
      item.stop = utcToZonedTime(entry.stop!!, Intl.DateTimeFormat().resolvedOptions().timeZone)
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
