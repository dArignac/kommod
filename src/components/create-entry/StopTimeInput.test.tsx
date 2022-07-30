import { render, waitFor } from "@testing-library/react"
import { TimeBookingStore } from "../../store"
import { getStopTimeInput } from "../../tests/selectors"
import { inputValueAndBlur } from "../../tests/utils"
import { StopTimeInput } from "./StopTimeInput"

const defaultProps = { placeholder: "", tabIndex: 1, width: 100 }

function renderElement() {
  return render(<StopTimeInput {...defaultProps} />)
}

test("renders the component", () => {
  renderElement()
})

test("filling a value updates the store", async () => {
  renderElement()
  inputValueAndBlur(getStopTimeInput(), "09:00")
  await waitFor(() => expect(TimeBookingStore.getRawState().stop).toBe("09:00"))
})

test("setting a non time value is marked as error", () => {
  renderElement()
  const input = getStopTimeInput()
  inputValueAndBlur(input, "a:00")
  expect(input.getAttribute("class")?.split(" ")).toContain("ant-input-status-error")
})
