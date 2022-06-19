import { render, waitFor } from "@testing-library/react"
import { BookingStore } from "../../store"
import { getStartTimeInput } from "../../tests/selectors"
import { inputValueAndBlur } from "../../tests/utils"
import { StartTimeInput } from "./StartTimeInput"

const defaultProps = { placeholder: "", tabIndex: 1, width: 100 }

function renderElement() {
  return render(<StartTimeInput {...defaultProps} />)
}

test("renders the component", () => {
  renderElement()
})

test("filling a value updates the store", async () => {
  renderElement()
  inputValueAndBlur(getStartTimeInput(), "0900")
  await waitFor(() => expect(BookingStore.getRawState().timeStart).toBe("09:00"))
})

test("setting a non time value is marked as error", () => {
  renderElement()
  const start = getStartTimeInput()
  inputValueAndBlur(start, "a:00")
  expect(start.getAttribute("class")?.split(" ")).toContain("ant-input-status-error")
})
