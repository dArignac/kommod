import { fireEvent, render, screen } from "@testing-library/react"
import format from "date-fns/format"
import subDays from "date-fns/subDays"
import { SingleDayViewStore } from "../store"
import { DaySelector } from "./DaySelector"

const dateFormat = "dd.MM.yyyy"

test("Renders with today as date picker value", () => {
  render(<DaySelector />)
  const datePicker = screen.getByTestId("date-picker") as HTMLInputElement
  expect(datePicker.value).toBe(format(new Date(), dateFormat))
})

test("Using buttons changes the date", () => {
  const today = new Date()

  render(<DaySelector />)
  const btnDayYesterday = screen.getByTestId("day-select-previous") as HTMLButtonElement
  const btnDayTomorrow = screen.getByTestId("day-select-next") as HTMLButtonElement
  const datePicker = screen.getByTestId("date-picker") as HTMLInputElement

  expect(datePicker.value).toBe(format(new Date(), dateFormat))
  expect(format(SingleDayViewStore.getRawState().day, dateFormat)).toBe(format(today, dateFormat))

  fireEvent.click(btnDayYesterday)
  expect(datePicker.value).toBe(format(subDays(today, 1), dateFormat))
  expect(format(SingleDayViewStore.getRawState().day, dateFormat)).toBe(format(subDays(today, 1), dateFormat))

  fireEvent.click(btnDayTomorrow)
  expect(datePicker.value).toBe(format(today, dateFormat))
  expect(format(SingleDayViewStore.getRawState().day, dateFormat)).toBe(format(today, dateFormat))
})
