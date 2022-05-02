import format from "date-fns/format"
import setHours from "date-fns/setHours"
import setMinutes from "date-fns/setMinutes"
import setSeconds from "date-fns/setSeconds"
import { config } from "../config"

export function formatDuration(seconds: number): string {
  return format(new Date(1970, 1, 1, 0, 0, seconds), "HH:mm:ss")
}

export function getTodaysDate(hours?: number, minutes?: number, seconds?: number): Date {
  let d = config.development.overwriteToday ? new Date(config.development.overwriteTodayValue!!) : new Date()
  if (hours !== undefined) d = setHours(d, hours)
  if (minutes !== undefined) d = setMinutes(d, minutes)
  if (seconds !== undefined) d = setSeconds(d, seconds)
  return d
}

export function getTodaysStart(): Date {
  return getTodaysDate(0, 0, 0)
}

export function getTodaysEnd(): Date {
  return getTodaysDate(23, 59, 59)
}
