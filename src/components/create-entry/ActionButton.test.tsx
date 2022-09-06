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

test("T.1 displays disabled button with 'Start' label as default", () => {
  renderButton()
  expect(getActionButton().textContent).toBe("Start")
  expect(getActionButton().disabled).toBeTruthy()
})

test("T.1 displays button with 'Start' label as default with setup store", () => {
  TimeBookingStore.update((s) => {
    s.description = "Test"
    s.projectId = 1
  })
  renderButton()
  expect(getActionButton().textContent).toBe("Start")
  expect(getActionButton().disabled).toBeTruthy()
})

test("T.2 displays start button with setup store with time", () => {
  TimeBookingStore.update((s) => {
    s.description = "Test"
    s.projectId = 1
    s.start = "11:30"
  })
  renderButton()
  expect(getActionButton().textContent).toBe("Start")
  expect(getActionButton().disabled).toBeFalsy()
})

test("T.3 displays save button with entry values", () => {
  TimeBookingStore.update((s) => {
    s.description = "Test"
    s.projectId = 1
    s.start = "11:30"
    s.stop = "12:30"
  })
  renderButton()
  expect(getActionButton().textContent).toBe("Save")
  expect(getActionButton().disabled).toBeFalsy()
})

test("T.4 displays stop button with running entry", () => {
  TimeBookingStore.update((s) => {
    s.description = mockTimeEntryRunning.description
    s.projectId = mockTimeEntryRunning.project.id
    s.start = "11:30"
    s.entry = mockTimeEntryRunning
  })
  renderButton()
  expect(getActionButton().textContent).toBe("Stop")
  expect(getActionButton().disabled).toBeFalsy()
})

test("T.4 displays stop button with running entry and stop time", () => {
  TimeBookingStore.update((s) => {
    s.description = mockTimeEntryRunning.description
    s.projectId = mockTimeEntryRunning.project.id
    s.start = "11:30"
    s.stop = "12:30"
    s.entry = mockTimeEntryRunning
  })
  renderButton()
  expect(getActionButton().textContent).toBe("Stop")
  expect(getActionButton().disabled).toBeFalsy()
})
