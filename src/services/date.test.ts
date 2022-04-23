import { config } from "../config"
import { formatDuration, getTodaysDate, getTodaysEnd, getTodaysStart } from "./date"

test("timezone is set to UTC", () => {
  expect(new Date().getTimezoneOffset()).toBe(0)
})

test("formats duration", () => {
  expect(formatDuration(0)).toBe("00:00:00")
  expect(formatDuration(11420)).toBe("03:10:20")
  expect(formatDuration(86399)).toBe("23:59:59")
})

test("calculates todays date correctly", () => {
  jest.useFakeTimers().setSystemTime(new Date("2022-01-16T12:33:00Z"))
  config.development.overwriteToday = false
  expect(getTodaysDate().toISOString()).toBe("2022-01-16T12:33:00.000Z")
  expect(getTodaysDate(7).toISOString()).toBe("2022-01-16T07:33:00.000Z")
  expect(getTodaysDate(7, 59).toISOString()).toBe("2022-01-16T07:59:00.000Z")
  expect(getTodaysDate(7, 59, 23).toISOString()).toBe("2022-01-16T07:59:23.000Z")
  expect(getTodaysDate(48, 120, 120).toISOString()).toBe("2022-01-18T02:02:00.000Z")
  expect(getTodaysDate(0, 0, 0).toISOString()).toBe("2022-01-16T00:00:00.000Z")
  expect(getTodaysDate(23, 59, 59).toISOString()).toBe("2022-01-16T23:59:59.000Z")
})

test("calculates todays date correctly with overwritten date", () => {
  jest.useRealTimers()
  config.development.overwriteToday = true
  config.development.overwriteTodayValue = "2022-04-22"
  expect(getTodaysDate().toISOString()).toBe("2022-04-22T00:00:00.000Z")
})

test("calculates todays start date correctly", () => {
  jest.useFakeTimers().setSystemTime(new Date("2022-01-16T12:33:00Z"))
  config.development.overwriteToday = false
  expect(getTodaysStart().toISOString()).toBe("2022-01-16T00:00:00.000Z")
})

test("calculates todays end date correctly", () => {
  jest.useFakeTimers().setSystemTime(new Date("2022-01-16T12:33:00Z"))
  config.development.overwriteToday = false
  expect(getTodaysEnd().toISOString()).toBe("2022-01-16T23:59:59.000Z")
})
