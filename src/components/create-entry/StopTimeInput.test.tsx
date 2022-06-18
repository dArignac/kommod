import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { BookingStore } from "../../store"
import { StopTimeInput } from "./StopTimeInput"

const defaultProps = { placeholder: "", tabIndex: 1, width: 100 }

function renderElement() {
  return render(<StopTimeInput {...defaultProps} />)
}

function getStopTimeInput() {
  return screen.getByTestId("time-input-stop")
}

test("renders the component", () => {
  renderElement()
})

test("filling a value updates the store", async () => {
  renderElement()
  const input = getStopTimeInput()

  act(() => input.focus())
  fireEvent.change(input, { target: { value: "09:00" } })
  act(() => input.blur())

  await waitFor(() => expect(BookingStore.getRawState().timeStop).toBe("09:00"))
})

test("setting a non time value is marked as error", () => {
  renderElement()
  const input = getStopTimeInput()

  act(() => input.focus())
  fireEvent.change(input, { target: { value: "a:00" } })
  act(() => input.blur())

  expect(getStopTimeInput().getAttribute("class")?.split(" ")).toContain("ant-input-status-error")
})
