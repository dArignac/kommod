import compareAsc from "date-fns/compareAsc"
import format from "date-fns/format"
import setHours from "date-fns/setHours"
import setMinutes from "date-fns/setMinutes"
import setSeconds from "date-fns/setSeconds"
import { StartStopable } from "../types"

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

export function sort<T extends StartStopable>(a: T, b: T): number {
  if (a.stop !== null && b.stop !== null) {
    return compareAsc(a.stop!, b.stop!)
  } else if (a.stop === null && b.stop === null) {
    return compareAsc(a.start, b.start)
  } else if (a.stop === null && b.stop !== null) {
    return -1
  } else if (a.stop !== null && b.stop === null) {
    return 1
  }
  return 0
}
