import axios, { AxiosInstance } from "axios"
import { config } from "../../config"
import { isDev } from "../../helpers"
import { ProjectStore, UserStore } from "../../store"
import { Project, TimeEntry, User } from "../../types"
import { DateService } from "../date/DateService"
import { ServiceFactory } from "../ServiceFactory"
import { TogglTimeEntry, TogglUserResponse } from "./types"

export class TogglService {
  private static instance: TogglService
  private ax: AxiosInstance
  private dateService: DateService

  private constructor() {
    this.dateService = ServiceFactory.getInstance().getDateService()
    this.ax = axios.create({
      baseURL: "https://api.track.toggl.com/api/v8",
      auth: {
        username: ServiceFactory.getInstance().getStorage().getToken(),
        password: "api_token",
      },
    })
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
    let { data } = await this.ax.get<TogglUserResponse>("/me", { params: { with_related_data: true } })

    // map data
    // we map only what we need - adjust tests accordingly
    const projects = data.data.projects.map((project) => {
      return {
        id: project.id,
        name: project.name,
      } as Project
    })
    const user = {
      email: data.data.email,
      id: data.data.id,
    } as User

    // update stores
    ProjectStore.update((s) => {
      s.projects = projects
    })
    UserStore.update((s) => {
      s.user = user
    })

    return user
  }

  /**
   * Fetches the time entries of the current day for the user.
   * @returns list of TimeEntry
   */
  public async fetchTimeEntriesOfToday(): Promise<TimeEntry[]> {
    if (isDev() && config.development.networkDelays.fetchEntries > 0) {
      await this.sleep(config.development.networkDelays.fetchEntries)
    }

    const { data } = await this.ax.get<TogglTimeEntry[]>("/time_entries", {
      params: { start_date: this.dateService.getTodaysStart().toISOString(), end_date: this.dateService.getTodaysEnd().toISOString() },
    })

    const projects = ProjectStore.getRawState().projects

    // we map only what we need - adjust tests accordingly
    return (
      data
        .map((entry: TogglTimeEntry) => {
          const project = projects.find((project) => project.id === entry.pid)
          return {
            description: entry.description,
            id: entry.id,
            project,
            start: new Date(entry.start),
            stop: new Date(entry.stop),
          } as TimeEntry
        })
        // sort entries
        .sort((a: TimeEntry, b: TimeEntry) => {
          if (a.start.getTime() < b.start.getTime()) return -1
          if (a.start.getTime() > b.start.getTime()) return 1
          return 0
        })
    )
  }

  public static getInstance(): TogglService {
    if (!TogglService.instance) {
      TogglService.instance = new TogglService()
    }
    return TogglService.instance
  }
}
