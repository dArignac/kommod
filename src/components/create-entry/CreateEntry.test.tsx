import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import sub from "date-fns/sub"
import { QueryClient, QueryClientProvider } from "react-query"
import { formatTime } from "../../services/date"
import { BookingStore, TogglStore } from "../../store"
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

test("Tabbing through subcomponents is in correct order", () => {
  renderWithClient()

  const taskSelector = getTaskSelector()

  userEvent.tab()
  expect(taskSelector).toHaveFocus()
  userEvent.tab()
  expect(within(screen.getByTestId("project-selector")).getByRole("combobox")).toHaveFocus()
})

test("A.1 active entry fills all fields accordingly", async () => {
  const now = new Date()
  const timeStart = formatTime(sub(now, { hours: 1 }))
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

  const { container } = renderWithClient()

  const taskSelector = getTaskSelector()

  expect(taskSelector).toHaveValue("Running Entry 1")
  expect(getProjectSelectorValueElement(container)).toHaveTextContent("Project B | Client A")
  expect(screen.getByTestId("time-input-timeStart")).toHaveValue(timeStart)
  expect(screen.getByTestId("time-input-timeStop")).toHaveValue("")
  expect(screen.getByTestId("action-button")).toHaveTextContent("Stop")
})
