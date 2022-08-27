import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import addHours from "date-fns/addHours"
import { TimeBookingStore, TogglStore } from "../../store"
import {
  mockClient1,
  mockProject1,
  mockProject2,
  mockTimeEntry3,
  mockTimeEntry4,
  mockTimeEntry5,
  mockTimeEntry6,
  mockTimeEntryRunning,
  mockTogglClient1,
  mockTogglProject1,
  mockTogglProject2,
  mockTogglTimeEntries1,
  mockTogglTimeEntryRunning,
  mockUser,
} from "../../tests/mocks"
import { resetStores } from "../../tests/store"
import { TimeEntry } from "../../types"
import { TogglService } from "./TogglService"

const mock = new MockAdapter(axios)

beforeEach(() => {
  jest.useFakeTimers().setSystemTime(new Date("2022-08-27"))
})

afterEach(() => {
  mock.resetHandlers()
  resetStores()
  jest.resetAllMocks()
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
  mock.onGet("/me").reply(200, mockUser)
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/clients`).reply(200, [mockTogglClient1])

  await TogglService.getInstance("").fetchUser()
  const clients = await TogglService.getInstance("").fetchClients(mockUser.default_workspace_id)
  const storeToggl = TogglStore.getRawState()

  expect(clients).toStrictEqual([mockClient1])
  expect(storeToggl.clients).toStrictEqual([mockClient1])
})

test("fetches and transforms project data", async () => {
  mock.onGet("/me").reply(200, mockUser)
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/clients`).reply(200, [mockTogglClient1])
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/projects`).reply(200, [mockTogglProject1, mockTogglProject2])

  await TogglService.getInstance("").fetchUser()
  await TogglService.getInstance("").fetchClients(mockUser.default_workspace_id)
  const projects = await TogglService.getInstance("").fetchProjects(mockUser.default_workspace_id)
  const storeToggl = TogglStore.getRawState()

  expect(projects).toStrictEqual([mockProject1, mockProject2])
  expect(storeToggl.projects).toStrictEqual([mockProject1, mockProject2])
})

test("fetches current time entry with no entry", async () => {
  mock.onGet("/me").reply(200, mockUser)
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/clients`).reply(200, [mockTogglClient1])
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/projects`).reply(200, [mockTogglProject1, mockTogglProject2])
  mock.onGet("/me/time_entries/current").reply(200, null)

  await TogglService.getInstance("").fetchUser()
  await TogglService.getInstance("").fetchClients(mockUser.default_workspace_id)
  await TogglService.getInstance("").fetchProjects(mockUser.default_workspace_id)

  const entry = await TogglService.getInstance("").fetchActiveTimeEntry()
  const store = TimeBookingStore.getRawState()

  expect(entry).toBeNull()
  expect(store).toHaveProperty("day")
  expect(store.projectId).toBeUndefined()
  expect(store.description).toBeUndefined()
  expect(store.entry).toBeUndefined()
  expect(store.start).toBeUndefined()
  expect(store.stop).toBeUndefined()
})

test("fetches current time entry with existing entry", async () => {
  mock.onGet("/me").reply(200, mockUser)
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/clients`).reply(200, [mockTogglClient1])
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/projects`).reply(200, [mockTogglProject1, mockTogglProject2])
  mock.onGet("/me/time_entries/current").reply(200, mockTogglTimeEntryRunning)

  await TogglService.getInstance("").fetchUser()
  await TogglService.getInstance("").fetchClients(mockUser.default_workspace_id)
  await TogglService.getInstance("").fetchProjects(mockUser.default_workspace_id)

  const entry = await TogglService.getInstance("").fetchActiveTimeEntry()
  const store = TimeBookingStore.getRawState()

  // check returned entry
  expect(entry).toEqual(mockTimeEntryRunning)

  // check store state
  expect(store.stop).toBeUndefined()
})

test("fetches and transforms todays entries correctly, UTC", async () => {
  mock.onGet("/me").reply(200, mockUser)
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/clients`).reply(200, [mockTogglClient1])
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/projects`).reply(200, [mockTogglProject1, mockTogglProject2])
  mock.onGet("/me/time_entries/current").reply(200, null)
  mock.onGet("/me/time_entries").reply(200, mockTogglTimeEntries1)

  await TogglService.getInstance("").fetchUser()
  await TogglService.getInstance("").fetchClients(mockUser.default_workspace_id)
  await TogglService.getInstance("").fetchProjects(mockUser.default_workspace_id)

  const day = new Date("2022-08-27T12:33:00Z")
  const results = await TogglService.getInstance("").fetchTimeEntriesOfDay(day)
  const history = mock.history.get.filter((h) => h.url === "/me/time_entries")[0]
  const storeToggl = TogglStore.getRawState()

  expect(history.params.start_date).toBe("2022-08-26")
  expect(history.params.end_date).toBe("2022-08-28")
  expect(results.length).toBe(4) // entries 3,4,5,6

  // sorting
  expect(results[0].id).toBe(6)
  expect(results[1].id).toBe(5)
  expect(results[2].id).toBe(4)
  expect(results[3].id).toBe(3)

  // transformation
  expect(results).toContainEqual(mockTimeEntry3)
  expect(results).toContainEqual(mockTimeEntry4)
  expect(results).toContainEqual(mockTimeEntry5)
  expect(results).toContainEqual(mockTimeEntry6)

  // tasks in store
  const tasks = [
    "Test entry 3 2022-08-27 00:00:00-01:00:00",
    "Test entry 4 2022-08-27 01:00:00-02:00:00",
    "Test entry 5 2022-08-27 02:00:00-03:00:00",
    "Test entry 6 2022-08-27 10:32:43-10:52:43",
  ]
  tasks.forEach((task) => expect(storeToggl.tasks).toContainEqual(task))
})

test("updating an entry works", async () => {
  mock.onGet("/me").reply(200, mockUser)
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/clients`).reply(200, [mockTogglClient1])
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/projects`).reply(200, [mockTogglProject1, mockTogglProject2])

  const mockedRespondedEntry = { ...mockTogglTimeEntryRunning }
  mockedRespondedEntry.id = 666
  mockedRespondedEntry.duration = 123
  mockedRespondedEntry.stop = "2013-03-11T12:30:00+00:00"
  const pathUrl = `/workspaces/${mockedRespondedEntry.workspace_id}/time_entries/${mockedRespondedEntry.id}`
  mock.onPut(pathUrl).reply(200, mockedRespondedEntry)

  await TogglService.getInstance("").fetchUser()
  await TogglService.getInstance("").fetchClients(mockUser.default_workspace_id)
  await TogglService.getInstance("").fetchProjects(mockUser.default_workspace_id)

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
