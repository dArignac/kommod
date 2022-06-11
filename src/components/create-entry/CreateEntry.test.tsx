import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import sub from "date-fns/sub"
import { QueryClient, QueryClientProvider } from "react-query"
import { formatTime } from "../../services/date"
import { BookingStore } from "../../store"
import { CreateEntry } from "./CreateEntry"

// FIXME #38 add tests
// FIXME test workflow

beforeEach(() => {
  jest.resetModules()
})

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

function getProjectSelector(): HTMLElement {
  return within(screen.getByTestId("project-selector")).getByRole("combobox") as HTMLElement
}

test("Tabbing through subcomponents is in correct order", () => {
  renderWithClient()

  const taskSelector = getTaskSelector()
  const projectSelector = getProjectSelector()

  userEvent.tab()
  expect(taskSelector).toHaveFocus()
  userEvent.tab()
  expect(projectSelector).toHaveFocus()
})

test("A.1 active entry fills all fields accordingly", async () => {
  const now = new Date()
  BookingStore.update((s) => {
    s.day = now
    s.projectId = 1
    s.timeStart = "10:00"
    s.timeEntryDescription = "Running Entry 1"
    s.timeEntryId = 1
    s.timeStart = formatTime(sub(now, { hours: 1 }))
  })

  renderWithClient()

  await new Promise((r) => setTimeout(r, 3000))

  const taskSelector = getTaskSelector()
  const projectSelector = getProjectSelector()

  expect(taskSelector).toHaveValue("Running Entry 1")
  // FIXME unclear how to get the value of the <Select> component, maybe inspire from here: https://github.com/ant-design/ant-design/blob/master/components/select/__tests__/index.test.js
})
