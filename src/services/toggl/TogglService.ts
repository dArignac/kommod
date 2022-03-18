import { TimeEntry } from "./TimeEntry"

export class TogglService {
  private static instance: TogglService

  private constructor() {}

  public static getInstance(): TogglService {
    if (!TogglService.instance) {
      TogglService.instance = new TogglService()
    }
    return TogglService.instance
  }

  getTimeEntries(): TimeEntry[] {
    return []
  }
}
