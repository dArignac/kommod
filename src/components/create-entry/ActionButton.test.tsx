import { render } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { BookingStore } from "../../store"
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
  BookingStore.update((s) => {
    s.projectId = 1
    s.timeEntryDescription = "Test"
  })
  renderButton()
  expect(getActionButton().textContent).toBe("Start")
  expect(getActionButton().disabled).toBeFalsy()
})

test("displays start button with setup store with time", () => {
  BookingStore.update((s) => {
    s.projectId = 1
    s.timeStart = "11:30"
    s.timeEntryDescription = "Test"
  })
  renderButton()
  expect(getActionButton().textContent).toBe("Start")
  expect(getActionButton().disabled).toBeFalsy()
})

test("A.2 displays stop button with entry values", () => {
  BookingStore.update((s) => {
    s.projectId = 1
    s.timeStart = "11:30"
    s.timeStop = "12:30"
    s.timeEntryDescription = "Test"
  })
  renderButton()
  expect(getActionButton().textContent).toBe("Stop")
  expect(getActionButton().disabled).toBeFalsy()
})

test("A.2 displays stop button with running entry", () => {
  BookingStore.update((s) => {
    s.projectId = 1
    s.timeStart = "11:30"
    s.timeEntryDescription = "Test"
    s.timeEntryId = 1
  })
  renderButton()
  expect(getActionButton().textContent).toBe("Stop")
  expect(getActionButton().disabled).toBeFalsy()
})
