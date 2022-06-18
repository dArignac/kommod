import { act, fireEvent, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import sub from "date-fns/sub"
import { QueryClient, QueryClientProvider } from "react-query"
import { formatTime } from "../../services/date"
import { BookingStore, TogglStore } from "../../store"
import { resetStores } from "../../tests/store"
import { Client, Project } from "../../types"
import { CreateEntry } from "./CreateEntry"

function renderWithClient() {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <CreateEntry />
    </QueryClientProvider>
  )
}

function getTaskSelector(): HTMLInputElement {
  return within(screen.getByTestId("task-selector")).getByRole("combobox") as HTMLInputElement
}

function getProjectSelectorValueElement(container: HTMLElement) {
  return container.querySelector(".ant-select-selection-item")
}

function getStartTimeInput() {
  return screen.getByTestId("time-input-start")
}

function getStopTimeInput() {
  return screen.getByTestId("time-input-stop")
}

function getActionButton() {
  return screen.getByTestId("action-button")
}

afterEach(() => {
  resetStores()
})

function setupWithRunningTimeEntry(now: Date, timeStart: string) {
  const clients = [{ id: 1, name: "Client A" }] as Client[]
  const projects = [
    { id: 1, name: "Project A", client: clients[0], color: "#ffffff" },
    { id: 2, name: "Project B", client: clients[0], color: "#ffffff" },
    { id: 3, name: "Project C", client: clients[0], color: "#ffffff" },
  ] as Project[]

  TogglStore.update((s) => {
    s.clients = clients
    s.projects = projects
  })

  BookingStore.update((s) => {
    s.day = now
    s.projectId = 2
    s.timeEntryDescription = "Running Entry 1"
    s.timeEntryId = 1
    s.timeStart = timeStart
  })
}

test("Tabbing through subcomponents is in correct order", () => {
  renderWithClient()

  userEvent.tab()
  expect(getTaskSelector()).toHaveFocus()
  userEvent.tab()
  expect(within(screen.getByTestId("project-selector")).getByRole("combobox")).toHaveFocus()
})

test("stop time cannot be before start time", () => {
  renderWithClient()

  const start = getStartTimeInput()
  const stop = getStopTimeInput()

  act(() => start.focus())
  fireEvent.change(start, { target: { value: "09:00" } })
  act(() => start.blur())

  act(() => stop.focus())
  fireEvent.change(stop, { target: { value: "08:59" } })
  act(() => stop.blur())

  expect(start.getAttribute("class")?.split(" ")).not.toContain("ant-input-status-error")
  expect(stop.getAttribute("class")?.split(" ")).toContain("ant-input-status-error")
})

test("A.1 active entry fills all fields accordingly", () => {
  const now = new Date()
  const timeStart = formatTime(sub(now, { hours: 1 }))
  setupWithRunningTimeEntry(now, timeStart)

  const { container } = renderWithClient()

  expect(getTaskSelector()).toHaveValue("Running Entry 1")
  expect(getProjectSelectorValueElement(container)).toHaveTextContent("Project B | Client A")
  expect(getStartTimeInput()).toHaveValue(timeStart)
  expect(getStopTimeInput()).toHaveValue("")
  expect(getActionButton()).toHaveTextContent("Stop")
})

test("A.2 entry can only be stopped with action button", () => {
  // TODO check description and project is readonly
  // TODO check start and end is alterable
  // TODO stop with set start and unset stop sends proper request
  // TODO stop with set start and stop sends proper request
})
