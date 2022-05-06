import { formatDuration, formatTime, setToBeforeMidnight, setToMidnight, sort } from "./date"

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
  expect(sort(a, b)).toBe(-1)
  expect(sort(b, a)).toBe(1)
  expect(sort(a, a)).toBe(0)

  // none has stop attribute
  expect(sort(c, d)).toBe(-1)
  expect(sort(d, c)).toBe(1)

  // first has stop attribute, second not
  expect(sort(a, d)).toBe(1)
  expect(sort(a, c)).toBe(1)
  expect(sort(b, d)).toBe(1)
  expect(sort(b, c)).toBe(1)

  // first has no stop attribute, second has
  expect(sort(c, a)).toBe(-1)
  expect(sort(c, b)).toBe(-1)
  expect(sort(d, a)).toBe(-1)
  expect(sort(d, b)).toBe(-1)
})
