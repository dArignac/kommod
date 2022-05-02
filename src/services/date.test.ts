import { formatDuration, setToBeforeMidnight, setToMidnight } from "./date"

test("timezone is set to UTC", () => {
  expect(new Date().getTimezoneOffset()).toBe(0)
})

test("formats duration", () => {
  expect(formatDuration(0)).toBe("00:00:00")
  expect(formatDuration(11420)).toBe("03:10:20")
  expect(formatDuration(86399)).toBe("23:59:59")
})

test("sets to midnight right", () => {
  const day = new Date("2022-01-16T12:33:00Z")
  expect(setToMidnight(day).toISOString()).toBe("2022-01-16T00:00:00.000Z")
})

test("sets to before midnight right", () => {
  const day = new Date("2022-01-16T12:33:00Z")
  expect(setToBeforeMidnight(day).toISOString()).toBe("2022-01-16T23:59:59.000Z")
})
