import { fireEvent, render, screen, waitForElementToBeRemoved, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import add from "date-fns/add"
import sub from "date-fns/sub"
import { QueryClient, QueryClientProvider } from "react-query"
import { formatTime } from "../../services/date"
import { TogglService } from "../../services/toggl/TogglService"
import { TimeBookingStore, TogglStore } from "../../store"
import { mockClient1, mockProject1, mockProject2, mockTimeEntryRunning, mockTimeEntryStopped } from "../../tests/mocks"
import { getActionButton, getProjectSelector, getProjectSelectorValueElement, getStartTimeInput, getStopTimeInput, getTaskSelector } from "../../tests/selectors"
import { resetStores } from "../../tests/store"
import { inputValueAndBlur } from "../../tests/utils"
import { TimeEntry } from "../../types"
import { CreateEntry } from "./CreateEntry"

const updateTimeEntryMock = jest.spyOn(TogglService.prototype, "updateTimeEntry")

function renderWithClient() {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <CreateEntry />
    </QueryClientProvider>
  )
}

function setupWithRunningTimeEntry(now: Date, timeStart: string) {
  TogglStore.update((s) => {
    s.clients = [mockClient1]
    s.projects = [mockProject1, mockProject2]
  })

  TimeBookingStore.update((s) => {
    s.day = now
    s.projectId = mockTimeEntryRunning.project.id
    s.description = mockTimeEntryRunning.description
    s.entry = mockTimeEntryRunning
    s.start = timeStart
  })
}

function mockStoppedTimeEntry() {
  const r = () =>
    new Promise<TimeEntry | null>(function (resolve, reject) {
      resolve(mockTimeEntryStopped)
    })
  updateTimeEntryMock.mockImplementation(r)
}

beforeEach(() => {
  updateTimeEntryMock.mockReset()
})

afterEach(() => {
  resetStores()
})

test("Tabbing through subcomponents is in correct order", () => {
  renderWithClient()

  userEvent.tab()
  expect(getTaskSelector()).toHaveFocus()
  userEvent.tab()
  expect(within(getProjectSelector()).getByRole("combobox")).toHaveFocus()
})

test("stop time cannot be before start time", () => {
  renderWithClient()

  const start = getStartTimeInput()
  const stop = getStopTimeInput()

  inputValueAndBlur(start, "09:00")
  inputValueAndBlur(stop, "08:59")

  expect(start.getAttribute("class")?.split(" ")).not.toContain("ant-input-status-error")
  expect(stop.getAttribute("class")?.split(" ")).toContain("ant-input-status-error")
})

test("A.1 active entry fills all fields accordingly", () => {
  const now = new Date()
  const timeStart = formatTime(sub(now, { hours: 1 }))
  setupWithRunningTimeEntry(now, timeStart)

  const { container } = renderWithClient()

  expect(getTaskSelector()).toHaveValue(mockTimeEntryRunning.description)
  expect(getProjectSelectorValueElement(container)).toHaveTextContent(`${mockTimeEntryRunning.project.name} | ${mockTimeEntryRunning.project.client.name}`)
  expect(getStartTimeInput()).toHaveValue(timeStart)
  expect(getStopTimeInput()).toHaveValue("")
  expect(getActionButton()).toHaveTextContent("Stop")
})

test("A.2 ui for stop entry behaves correctly", async () => {
  const now = new Date()
  const timeStart = formatTime(sub(now, { hours: 1 }))
  setupWithRunningTimeEntry(now, timeStart)
  mockStoppedTimeEntry()

  const { container } = await renderWithClient()
  const task = getTaskSelector()
  const start = getStartTimeInput()
  const stop = getStopTimeInput()

  expect(getTaskSelector()).toHaveValue(mockTimeEntryRunning.description)
  expect(task).toBeDisabled()
  expect(getProjectSelectorValueElement(container)).toHaveTextContent(`${mockTimeEntryRunning.project.name} | ${mockTimeEntryRunning.project.client.name}`)
  expect(getProjectSelector().getAttribute("class")?.split(" ")).toContain("ant-select-disabled")
  expect(start).toHaveValue(timeStart)
  expect(stop).toHaveValue("")
  expect(getActionButton()).toHaveTextContent("Stop")

  // check start and end is alterable
  inputValueAndBlur(start, "09:00")
  expect(TimeBookingStore.getRawState().start).toBe("09:00")
  expect(TimeBookingStore.getRawState().stop).toBeUndefined()

  inputValueAndBlur(stop, "10:00")
  expect(TimeBookingStore.getRawState().start).toBe("09:00")
  expect(TimeBookingStore.getRawState().stop).toBe("10:00")
})

test("A.3 + A.5 stop entry with set start time and no stop time works", async () => {
  const now = new Date()
  const timeStart = sub(now, { hours: 1 })
  const timeStop = now
  setupWithRunningTimeEntry(now, formatTime(timeStart))
  mockStoppedTimeEntry()
  const { container } = await renderWithClient()

  fireEvent.click(getActionButton())

  const notificiation = await screen.findByText("Entry updated.")
  expect(notificiation).toBeVisible()
  await waitForElementToBeRemoved(() => screen.queryByText("Entry updated."))

  expect(updateTimeEntryMock).toBeCalledTimes(1)
  expect(updateTimeEntryMock).toBeCalledWith({
    ...mockTimeEntryRunning,
    duration: 3600, // 1h
    start: timeStart,
    stop: timeStop,
  } as TimeEntry)

  // check reset of UI
  expect(getTaskSelector()).toHaveValue("")
  expect(getProjectSelectorValueElement(container)).toHaveTextContent(`${mockTimeEntryRunning.project.name} | ${mockTimeEntryRunning.project.client.name}`)
  expect(getStartTimeInput()).toHaveValue(formatTime(new Date()))
  expect(getStopTimeInput()).toHaveValue("")
  expect(getActionButton()).toHaveTextContent("Start")
})

test("A.4 + A.5 stop entry with set start time and set stop time works", async () => {
  const now = new Date()
  const timeStart = sub(now, { hours: 1 })
  const timeStop = add(now, { hours: 1 })
  setupWithRunningTimeEntry(now, formatTime(timeStart))
  mockStoppedTimeEntry()
  const { container } = await renderWithClient()
  inputValueAndBlur(getStopTimeInput(), formatTime(timeStop))

  fireEvent.click(getActionButton())
  await screen.findByText("Entry updated.")

  expect(updateTimeEntryMock).toBeCalledTimes(1)
  expect(updateTimeEntryMock).toBeCalledWith({
    ...mockTimeEntryRunning,
    duration: 7200, // 2h
    start: timeStart,
    stop: timeStop,
  } as TimeEntry)

  // check reset of UI
  expect(getTaskSelector()).toHaveValue("")
  expect(getProjectSelectorValueElement(container)).toHaveTextContent(`${mockTimeEntryRunning.project.name} | ${mockTimeEntryRunning.project.client.name}`)
  expect(getStartTimeInput()).toHaveValue(formatTime(new Date()))
  expect(getStopTimeInput()).toHaveValue("")
  expect(getActionButton()).toHaveTextContent("Start")
})
