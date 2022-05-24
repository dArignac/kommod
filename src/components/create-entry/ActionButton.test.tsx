import { render, screen } from "@testing-library/react"
import { BookingStore } from "../../store"
import { ActionButton } from "./ActionButton"

const defaultProps = { tabIndex: 1, width: 100 }
const getButton = () => screen.getByTestId("action-button") as HTMLButtonElement

test("renders the component", () => {
  render(<ActionButton {...defaultProps} />)
})

test("displays start button with default store", () => {
  render(<ActionButton {...defaultProps} />)
  expect(getButton().textContent).toBe("Start")
})

test("displays start button with setup store (scenario 1)", () => {
  BookingStore.update((s) => {
    s.projectId = 1
    s.timeEntryDescription = "Test"
  })
  render(<ActionButton {...defaultProps} />)
  expect(getButton().textContent).toBe("Start")
})

test("displays start button with setup store (scenario 2)", () => {
  BookingStore.update((s) => {
    s.projectId = 1
    s.timeStart = "11:30"
    s.timeEntryDescription = "Test"
  })
  render(<ActionButton {...defaultProps} />)
  expect(getButton().textContent).toBe("Start")
})

test("displays stop button with setup store (scenario 3)", () => {
  BookingStore.update((s) => {
    s.projectId = 1
    s.timeStart = "11:30"
    s.timeStop = "12:30"
    s.timeEntryDescription = "Test"
  })
  render(<ActionButton {...defaultProps} />)
  expect(getButton().textContent).toBe("Stop")
})

test("displays stop button with setup store (scenario 4)", () => {
  BookingStore.update((s) => {
    s.projectId = 1
    s.timeStart = "11:30"
    s.timeEntryDescription = "Test"
    s.timEntryId = 1
  })
  render(<ActionButton {...defaultProps} />)
  expect(getButton().textContent).toBe("Stop")
})
