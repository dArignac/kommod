import { DateService } from "./DateService"

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
