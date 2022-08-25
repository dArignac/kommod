import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import addHours from "date-fns/addHours"
import { TimeBookingStore, TogglStore } from "../../store"
import {
  mockClient1,
  mockProject1,
  mockProject2,
  mockTimeEntries1,
  mockTimeEntry1,
  mockTimeEntry2,
  mockTimeEntryRunning,
  mockTogglClient1,
  mockTogglProject1,
  mockTogglProject2,
  mockTogglTimeEntryRunning,
  mockUser,
} from "../../tests/mocks"
import { TimeEntry } from "../../types"
import { TogglService } from "./TogglService"

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.resetHandlers()
})

test("fetches and transforms user data", async () => {
  mock.onGet("/me").reply(200, mockUser)

  const user = await TogglService.getInstance("").fetchUser()
  const storeToggl = TogglStore.getRawState()

  expect(user.id).toBe(9000)
  expect(user.email).toBe("johnt@swift.com")
  expect(storeToggl.user).toBe(user)
})

test("fetches and transforms client data", async () => {
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/clients`).reply(200, [mockTogglClient1])

  const clients = await TogglService.getInstance("").fetchClients(mockUser.default_workspace_id)
  const storeToggl = TogglStore.getRawState()

  expect(clients).toStrictEqual([mockClient1])
  expect(storeToggl.clients).toStrictEqual([mockClient1])
})

test("fetches and transforms project data", async () => {
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/clients`).reply(200, [mockTogglClient1])
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/projects`).reply(200, [mockTogglProject1, mockTogglProject2])

  await TogglService.getInstance("").fetchClients(mockUser.default_workspace_id)
  const projects = await TogglService.getInstance("").fetchProjects(mockUser.default_workspace_id)
  const storeToggl = TogglStore.getRawState()

  expect(projects).toStrictEqual([mockProject1, mockProject2])
  expect(storeToggl.projects).toStrictEqual([mockProject1, mockProject2])
})

test("fetches current time entry with no entry", async () => {
  mock.onGet("/me/time_entries/current").reply(200, null)

  const entry = await TogglService.getInstance("").fetchActiveTimeEntry()
  const store = TimeBookingStore.getRawState()

  expect(entry).toBeNull()
  expect(store).toHaveProperty("day")
  expect(store).not.toHaveProperty("projectId")
  expect(store).not.toHaveProperty("timeEntryDescription")
  expect(store).not.toHaveProperty("timEntryId")
  expect(store).not.toHaveProperty("timeStart")
  expect(store).not.toHaveProperty("timeStop")
})

test("fetches current time entry with existing entry", async () => {
  mock.onGet("/me/time_entries/current").reply(200, mockTogglTimeEntryRunning)

  const entry = await TogglService.getInstance("").fetchActiveTimeEntry()
  const store = TimeBookingStore.getRawState()

  // check returned entry
  expect(entry).toEqual(mockTimeEntryRunning)

  // check store state
  expect(store).not.toHaveProperty("stop")
})

test("fetches and transforms todays entries correctly", async () => {
  // ignore the query params
  mock.onGet("/me/time_entries").reply(200, mockTimeEntries1)

  const day = new Date("2022-01-16T12:33:00Z")
  const results = await TogglService.getInstance("").fetchTimeEntriesOfDay(day)
  const history = mock.history.get.filter((h) => h.url === "/me/time_entries")[0]
  const storeToggl = TogglStore.getRawState()

  expect(history.params.start_date).toBe("2022-01-16")
  expect(history.params.end_date).toBe("2022-01-17")
  expect(results.length).toBe(mockTimeEntries1.length)

  // sorting
  expect(results[0].id).toBe(2)
  expect(results[1].id).toBe(1)

  // transformation
  expect(results).toContainEqual(mockTimeEntry1)
  expect(results).toContainEqual(mockTimeEntry2)

  // tasks in store
  expect(storeToggl.tasks).toEqual(["Meeting with the client", "important work"])
})

test("active entries are always sorted to the top", async () => {
  mock.onGet("/me/time_entries").reply(200, [
    { id: 1, start: "2022-05-05T10:00:00+00:00", stop: "2022-05-05T11:00:00+00:00" },
    { id: 2, start: "2022-05-05T10:00:00+00:00" },
    { id: 3, start: "2022-05-05T09:00:00+00:00", stop: "2022-05-05T10:00:00+00:00" },
  ])

  const results = await TogglService.getInstance("").fetchTimeEntriesOfDay(new Date("2022-01-16T12:33:00Z"))

  // sorting
  expect(results[0].id).toBe(2)
  expect(results[1].id).toBe(1)
  expect(results[2].id).toBe(3)
})

test("updating an entry works", async () => {
  const mockedRespondedEntry = { ...mockTogglTimeEntryRunning }
  mockedRespondedEntry.id = 666
  mockedRespondedEntry.duration = 123
  mockedRespondedEntry.stop = "2013-03-11T12:30:00+00:00"
  const pathUrl = `/workspaces/${mockedRespondedEntry.workspace_id}/time_entries/${mockedRespondedEntry.id}`
  mock.onPut(pathUrl).reply(200, mockedRespondedEntry)

  const payload: TimeEntry = {
    ...mockTimeEntryRunning,
    description: "The current, active entry",
    duration: mockedRespondedEntry.duration,
    id: mockedRespondedEntry.id,
    start: new Date(mockedRespondedEntry.start),
    stop: addHours(new Date(mockedRespondedEntry.start), 1),
  }

  const entry = await TogglService.getInstance("").updateTimeEntry(payload)
  const history = mock.history.put.filter((h) => h.url === pathUrl)[0]

  // params and auth
  expect(history.auth).toEqual({
    username: "",
    password: "api_token",
  })

  // content
  expect(entry).toEqual(payload)
})

test("returns correct if entry cannot be updated", async () => {
  mock.onPut("/me/time_entries/666").reply(404)
  const entry = await TogglService.getInstance("").updateTimeEntry({} as TimeEntry)
  expect(entry).toBeNull()
})
