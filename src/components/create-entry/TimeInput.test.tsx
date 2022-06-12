import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { BookingStore } from "../../store"
import { TimeInput } from "./TimeInput"

const defaultProps = { validateOnEmpty: false, placeholder: "", tabIndex: 1, width: 100 }

function renderElement() {
  return render(<TimeInput storeAttribute="timeStart" {...defaultProps} />)
}

function getStartTimeInput() {
  return screen.getByTestId("time-input-timeStart")
}

test("renders the component", () => {
  renderElement()
})

test("filling a value updates the store", async () => {
  renderElement()
  const input = getStartTimeInput()

  act(() => input.focus())
  fireEvent.change(input, { target: { value: "09:00" } })
  act(() => input.blur())

  await waitFor(() => expect(BookingStore.getRawState().timeStart).toBe("09:00"))
})

test("setting a non time value is marked as error", () => {
  renderElement()
  const input = getStartTimeInput()

  act(() => input.focus())
  fireEvent.change(input, { target: { value: "a:00" } })
  act(() => input.blur())

  expect(getStartTimeInput().getAttribute("class")?.split(" ")).toContain("ant-input-status-error")
})
