import { DateService } from "./DateService"
import { config } from "../../config"

test("calculates todays start date correctly", () => {
  jest.useFakeTimers().setSystemTime(new Date("2022-01-16T12:33:00"))
  const result = DateService.getInstance().getTodaysStart()
  expect(result.toISOString()).toBe("2022-01-16T00:00:00.000Z")
})

test("calculates todays end date correctly", () => {
  jest.useFakeTimers().setSystemTime(new Date("2022-01-16T12:33:00"))
  const result = DateService.getInstance().getTodaysEnd()
  expect(result.toISOString()).toBe("2022-01-16T23:59:59.000Z")
})

test("overwriting today's date works", () => {
  jest.useFakeTimers().setSystemTime(new Date("2022-01-01T00:00:00"))
  config.overwriteToday = true
  config.overwriteTodayValue = "2023-11-27T12:13:14"
  expect(DateService.getInstance().getTodaysStart().toISOString()).toBe("2023-11-27T00:00:00.000Z")
  expect(DateService.getInstance().getTodaysEnd().toISOString()).toBe("2023-11-27T23:59:59.000Z")
})
