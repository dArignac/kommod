import { combineDateWithTime, formatDuration, formatTime, parseTime, setToBeforeMidnight, setToMidnight, sortStartStopables } from "./date"

test("timezone is set to UTC", () => {
  expect(new Date().getTimezoneOffset()).toBe(0)
})

test("formats duration", () => {
  expect(formatDuration(0)).toBe("00:00:00")
  expect(formatDuration(11420)).toBe("03:10:20")
  expect(formatDuration(86399)).toBe("23:59:59")
})

test("sets to midnight right", () => {
  expect(setToMidnight(new Date("2022-01-16T12:33:00Z")).toISOString()).toBe("2022-01-16T00:00:00.000Z")
})

test("sets to before midnight right", () => {
  expect(setToBeforeMidnight(new Date("2022-01-16T12:33:00Z")).toISOString()).toBe("2022-01-16T23:59:59.000Z")
})

test("formats time correctly", () => {
  expect(formatTime(new Date("2022-01-16T12:33:00Z"))).toBe("12:33")
})

test("compares StartStopables correctly", () => {
  const a = { start: new Date("2022-05-05T12:00:00Z"), stop: new Date("2022-05-05T12:30:00Z") }
  const b = { start: new Date("2022-05-05T12:30:00Z"), stop: new Date("2022-05-05T13:00:00Z") }
  const c = { start: new Date("2022-05-05T12:30:00Z") }
  const d = { start: new Date("2022-05-05T14:30:00Z") }

  // both have stop attribute
  expect(sortStartStopables(a, b)).toBe(1)
  expect(sortStartStopables(b, a)).toBe(-1)
  expect(sortStartStopables(a, a)).toBe(0)

  // none has stop attribute
  expect(sortStartStopables(c, d)).toBe(1)
  expect(sortStartStopables(d, c)).toBe(-1)

  // first has stop attribute, second not
  expect(sortStartStopables(a, d)).toBe(1)
  expect(sortStartStopables(a, c)).toBe(1)
  expect(sortStartStopables(b, d)).toBe(1)
  expect(sortStartStopables(b, c)).toBe(1)

  // first has no stop attribute, second has
  expect(sortStartStopables(c, a)).toBe(-1)
  expect(sortStartStopables(c, b)).toBe(-1)
  expect(sortStartStopables(d, a)).toBe(-1)
  expect(sortStartStopables(d, b)).toBe(-1)
})

test("parsing time works", () => {
  expect(parseTime("")).toBeNull()
  expect(parseTime("12:00:00")).toBeNull()
  expect(parseTime("lolz")).toBeNull()
  expect(parseTime("09:00")).toBe("09:00")
  expect(parseTime("09:13")).toBe("09:13")
  expect(parseTime("9:13")).toBe("09:13")
  expect(parseTime("913")).toBe("09:13")
  expect(parseTime("23:59")).toBe("23:59")
  expect(parseTime("25:61")).toBe("23:59")
})

test("combining date and time works", () => {
  expect(combineDateWithTime(new Date("2022-05-05T12:00:00Z"), "00:00")).toEqual(new Date("2022-05-05T00:00:00Z"))
  expect(combineDateWithTime(new Date("2022-05-05T12:00:22Z"), "23:59")).toEqual(new Date("2022-05-05T23:59:22Z"))
})
