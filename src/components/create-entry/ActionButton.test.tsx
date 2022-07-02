import { render } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { TimeBookingStore } from "../../store"
import { mockTimeEntryRunning } from "../../tests/mocks"
import { getActionButton } from "../../tests/selectors"
import { ActionButton } from "./ActionButton"

const defaultProps = { tabIndex: 1, width: 100 }
const renderButton = () => {
  const queryClient = new QueryClient()
  render(
    <QueryClientProvider client={queryClient}>
      <ActionButton {...defaultProps} />
    </QueryClientProvider>
  )
}

test("renders the component", () => {
  renderButton()
})

test("displays start button with default store", () => {
  renderButton()
  expect(getActionButton().textContent).toBe("Start")
  expect(getActionButton().disabled).toBeTruthy()
})

test("displays start button with setup store", () => {
  TimeBookingStore.update((s) => {
    s.projectId = 1
    s.description = "Test"
  })
  renderButton()
  expect(getActionButton().textContent).toBe("Start")
  expect(getActionButton().disabled).toBeFalsy()
})

test("displays start button with setup store with time", () => {
  TimeBookingStore.update((s) => {
    s.projectId = 1
    s.start = "11:30"
    s.description = "Test"
  })
  renderButton()
  expect(getActionButton().textContent).toBe("Start")
  expect(getActionButton().disabled).toBeFalsy()
})

test("A.2 displays stop button with entry values", () => {
  TimeBookingStore.update((s) => {
    s.projectId = 1
    s.start = "11:30"
    s.stop = "12:30"
    s.description = "Test"
  })
  renderButton()
  expect(getActionButton().textContent).toBe("Stop")
  expect(getActionButton().disabled).toBeFalsy()
})

test("A.2 displays stop button with running entry", () => {
  TimeBookingStore.update((s) => {
    s.projectId = mockTimeEntryRunning.project.id
    s.start = "11:30"
    s.description = mockTimeEntryRunning.description
    s.entry = mockTimeEntryRunning
  })
  renderButton()
  expect(getActionButton().textContent).toBe("Stop")
  expect(getActionButton().disabled).toBeFalsy()
})
