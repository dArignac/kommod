import { render, screen } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { BookingStore } from "../../store"
import { ActionButton } from "./ActionButton"

const defaultProps = { tabIndex: 1, width: 100 }
const getButton = () => screen.getByTestId("action-button") as HTMLButtonElement
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
  expect(getButton().textContent).toBe("Start")
  expect(getButton().disabled).toBeTruthy()
})

test("displays start button with setup store (scenario 1)", () => {
  BookingStore.update((s) => {
    s.projectId = 1
    s.timeEntryDescription = "Test"
  })
  renderButton()
  expect(getButton().textContent).toBe("Start")
  expect(getButton().disabled).toBeFalsy()
})

test("displays start button with setup store (scenario 2)", () => {
  BookingStore.update((s) => {
    s.projectId = 1
    s.timeStart = "11:30"
    s.timeEntryDescription = "Test"
  })
  renderButton()
  expect(getButton().textContent).toBe("Start")
  expect(getButton().disabled).toBeFalsy()
})

test("displays stop button with setup store (scenario 3)", () => {
  BookingStore.update((s) => {
    s.projectId = 1
    s.timeStart = "11:30"
    s.timeStop = "12:30"
    s.timeEntryDescription = "Test"
  })
  renderButton()
  expect(getButton().textContent).toBe("Stop")
  expect(getButton().disabled).toBeFalsy()
})

test("displays stop button with setup store (scenario 4)", () => {
  BookingStore.update((s) => {
    s.projectId = 1
    s.timeStart = "11:30"
    s.timeEntryDescription = "Test"
    s.timeEntryId = 1
  })
  renderButton()
  expect(getButton().textContent).toBe("Stop")
  expect(getButton().disabled).toBeFalsy()
})
