import format from "date-fns/format"
import setHours from "date-fns/setHours"
import setMinutes from "date-fns/setMinutes"
import setSeconds from "date-fns/setSeconds"

export function formatDuration(seconds: number): string {
  return format(new Date(1970, 1, 1, 0, 0, seconds), "HH:mm:ss")
}

export function formatTime(day: Date): string {
  return format(day, "HH:mm")
}

export function setToMidnight(day: Date): Date {
  return setSeconds(setMinutes(setHours(day, 0), 0), 0)
}

export function setToBeforeMidnight(day: Date): Date {
  return setSeconds(setMinutes(setHours(day, 23), 59), 59)
}
