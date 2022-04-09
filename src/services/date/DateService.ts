import { config } from "../../config"

export class DateService {
  private static instance: DateService
  private constructor() {}
  public static getInstance(): DateService {
    if (!DateService.instance) {
      DateService.instance = new DateService()
    }
    return DateService.instance
  }

  private getTodaysDate(hour: number = 0, minute: number = 0, second: number = 0): Date {
    if (hour < 0 || hour > 23) hour = 0
    if (minute < 0 || minute > 59) minute = 0
    if (second < 0 || second > 59) second = 0
    let x = config.overwriteToday ? new Date(config.overwriteTodayValue!!) : new Date()
    return new Date(Date.UTC(x.getUTCFullYear(), x.getUTCMonth(), x.getUTCDate(), hour, minute, second))
  }

  public getTodaysStart(): Date {
    return this.getTodaysDate()
  }

  public getTodaysEnd(): Date {
    return this.getTodaysDate(23, 59, 59)
  }
}
