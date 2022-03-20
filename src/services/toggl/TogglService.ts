import axios, { AxiosInstance } from "axios"
import { DateService } from "../date/DateService"
import { ServiceFactory } from "../ServiceFactory"
import { TimeEntry, TogglTimeEntry } from "./types"

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

  public async fetchTimeEntriesOfToday(): Promise<TimeEntry[]> {
    const { data } = await this.ax.get<TogglTimeEntry[]>("/time_entries", {
      params: { start_date: this.dateService.getTodaysStart().toISOString(), end_date: this.dateService.getTodaysEnd().toISOString() },
    })
    // we map only what we need - adjust tests accordingly
    return data
      .map((entry: TogglTimeEntry) => {
        return {
          description: entry.description,
          id: entry.id,
          start: new Date(entry.start),
          stop: new Date(entry.stop),
        } as TimeEntry
      })
      .sort((a: TimeEntry, b: TimeEntry) => {
        if (a.start.getTime() < b.start.getTime()) return -1
        if (a.start.getTime() > b.start.getTime()) return 1
        return 0
      })
  }

  public static getInstance(): TogglService {
    if (!TogglService.instance) {
      TogglService.instance = new TogglService()
    }
    return TogglService.instance
  }
}
