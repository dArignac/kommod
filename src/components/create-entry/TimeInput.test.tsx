import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { BookingStore } from "../../store"
import { TimeInput } from "./TimeInput"

const defaultProps = { validateOnEmpty: false, placeholder: "", tabIndex: 1, width: 100 }

test("renders the component", () => {
  render(<TimeInput storeAttribute="timeStart" {...defaultProps} />)
})

test("filling a value updates the store", async () => {
  render(<TimeInput storeAttribute="timeStart" {...defaultProps} />)
  const input = screen.getByTestId("time-input-timeStart")

  act(() => input.focus())
  fireEvent.change(input, { target: { value: "09:00" } })
  act(() => input.blur())

  await waitFor(() => expect(BookingStore.getRawState().timeStart).toBe("09:00"))
})
