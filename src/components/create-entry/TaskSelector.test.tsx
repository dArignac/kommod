import { render } from "@testing-library/react"
import { TimeBookingStore } from "../../store"
import { mockTimeEntryRunning } from "../../tests/mocks"
import { getTaskSelector } from "../../tests/selectors"
import { TaskSelector } from "./TaskSelector"

function renderTaskSelector() {
  render(<TaskSelector tabIndex={1} width={200} />)
}

test("renders the component enabled by default", () => {
  renderTaskSelector()
  expect(getTaskSelector().disabled).toBeFalsy()
  expect(getTaskSelector()).toHaveValue("")
})

test("if store has a value, it is displayed but selector is disabled", () => {
  TimeBookingStore.update((s) => {
    s.description = mockTimeEntryRunning.description
    s.entry = mockTimeEntryRunning
  })
  renderTaskSelector()
  expect(getTaskSelector().disabled).toBeTruthy()
  expect(getTaskSelector()).toHaveValue(mockTimeEntryRunning.description)
})
