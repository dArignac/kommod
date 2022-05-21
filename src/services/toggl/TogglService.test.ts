import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { mockTimeEntries1, mockTimeEntryCurrent, mockUser } from "../../mocks"
import { BookingStore, TogglStore } from "../../store"
import { Client, Project, TimeEntry } from "../../types"
import { TogglService } from "./TogglService"

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.resetHandlers()
})

test("fetches and transforms user data correctly", async () => {
  mock.onGet("/me").reply(200, mockUser)

  const user = await TogglService.getInstance("").fetchUser()
  const storeToggl = TogglStore.getRawState()

  // clients
  expect(storeToggl.clients.length).toBe(1)
  expect(storeToggl.clients).toContainEqual({
    id: 1,
    name: "Client A",
  })

  // tasks
  expect(storeToggl.tasks).toStrictEqual(["Time entries task a", "Time entries task b"])

  // projects
  expect(storeToggl.projects.length).toBe(2)
  expect(storeToggl.projects).toContainEqual({
    client: {
      id: 1,
      name: "Client A",
    },
    color: "#ff0000",
    id: 1,
    name: "Project A",
  })
  expect(storeToggl.projects).toContainEqual({
    client: {
      id: 1,
      name: "Client A",
    },
    color: "#0000aa",
    id: 2,
    name: "Project B",
  })

  // sorting is alphabetically by name
  expect(storeToggl.projects[0].id).toBe(1)
  expect(storeToggl.projects[1].id).toBe(2)

  // user
  expect(user.id).toBe(9000)
  expect(user.email).toBe("johnt@swift.com")
  expect(storeToggl.user).toBe(user)
})

test("fetches current time entry with no entry", async () => {
  mock.onGet("/me").reply(200, mockUser)
  mock.onGet("/time_entries/current").reply(200, { data: null })

  const entry = await TogglService.getInstance("").fetchActiveTimeEntry()
  const store = BookingStore.getRawState()

  expect(entry).toBeNull()
  expect(store).toHaveProperty("day")
  expect(store).not.toHaveProperty("projectId")
  expect(store).not.toHaveProperty("timeEntryDescription")
  expect(store).not.toHaveProperty("timEntryId")
  expect(store).not.toHaveProperty("timeStart")
  expect(store).not.toHaveProperty("timeStop")
})

test("fetches current time entry with existing entry", async () => {
  mock.onGet("/me").reply(200, mockUser)
  mock.onGet("/time_entries/current").reply(200, mockTimeEntryCurrent)

  const entry = await TogglService.getInstance("").fetchActiveTimeEntry()
  const store = BookingStore.getRawState()

  expect(entry).toEqual({
    description: "The current, active entry",
    duration: 14400,
    id: 3,
    project: {
      client: {
        id: 1,
        name: "Client A",
      } as Client,
      color: "#ff0000",
      id: 1,
      name: "Project A",
    } as Project,
    start: new Date("2013-03-11T11:36:00+00:00"),
  } as TimeEntry)
  expect(store).not.toHaveProperty("stop")
})

test("fetches and transforms todays entries correctly", async () => {
  mock.onGet("/time_entries").reply(200, mockTimeEntries1)

  const day = new Date("2022-01-16T12:33:00Z")
  const results = await TogglService.getInstance("").fetchTimeEntriesOfDay(day)
  const history = mock.history.get.filter((h) => h.url === "/time_entries")[0]

  expect(history.params.start_date).toBe("2022-01-16T00:00:00.000Z")
  expect(history.params.end_date).toBe("2022-01-16T23:59:59.000Z")
  expect(results.length).toBe(mockTimeEntries1.length)

  // sorting
  expect(results[0].id).toBe(2)
  expect(results[1].id).toBe(1)

  // transformation
  expect(results).toContainEqual({
    description: "Meeting with the client",
    duration: 14400,
    id: 1,
    project: {
      client: {
        id: 1,
        name: "Client A",
      },
      color: "#ff0000",
      id: 1,
      name: "Project A",
    },
    start: new Date("2013-03-11T11:36:00.000Z"),
    stop: new Date("2013-03-11T15:36:00.000Z"),
  })
  expect(results).toContainEqual({
    description: "important work",
    duration: 18400,
    id: 2,
    project: {
      client: {
        id: 1,
        name: "Client A",
      },
      color: "#0000aa",
      id: 2,
      name: "Project B",
    },
    start: new Date("2013-03-12T10:32:43.000Z"),
  })
})

test("active entries are always sorted to the top", async () => {
  mock.onGet("/time_entries").reply(200, [
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
