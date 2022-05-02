import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { mockTimeEntries, mockUser } from "../../mocks"
import { ClientStore, ProjectStore, UserStore } from "../../store"
import { TogglService } from "./TogglService"

const mock = new MockAdapter(axios)

afterEach(() => mock.resetHandlers())

test("fetches and transforms user data correctly", async () => {
  mock.onGet("/me").reply(200, mockUser)

  const user = await TogglService.getInstance("").fetchUser()
  const storeClients = ClientStore.getRawState().clients
  const storeProjects = ProjectStore.getRawState().projects
  const storeUser = UserStore.getRawState().user

  // clients
  expect(storeClients.length).toBe(1)
  expect(storeClients).toContainEqual({
    id: 923476,
    name: "Client A",
  })

  // projects
  expect(storeProjects.length).toBe(2)
  expect(storeProjects).toContainEqual({
    client: {
      id: 923476,
      name: "Client A",
    },
    color: "#ff0000",
    id: 1230994,
    name: "Project A",
  })
  expect(storeProjects).toContainEqual({
    client: {
      id: 923476,
      name: "Client A",
    },
    color: "#0000aa",
    id: 1230995,
    name: "Project B",
  })

  // user
  expect(user.id).toBe(9000)
  expect(user.email).toBe("johnt@swift.com")
  expect(storeUser).toBe(user)
})

test("fetches and transforms todays entries correctly", async () => {
  mock.onGet("/time_entries").reply(200, mockTimeEntries)

  const day = new Date("2022-01-16T12:33:00Z")
  const results = await TogglService.getInstance("").fetchTimeEntriesOfDay(day)
  const history = mock.history.get.filter((h) => h.url === "/time_entries")[0]

  expect(history.params.start_date).toBe("2022-01-16T00:00:00.000Z")
  expect(history.params.end_date).toBe("2022-01-16T23:59:59.000Z")
  expect(results.length).toBe(mockTimeEntries.length)

  // sorting
  expect(results[0].id).toBe(436776436)
  expect(results[1].id).toBe(436691234)

  // transformation
  expect(results).toContainEqual({
    description: "Meeting with the client",
    duration: 14400,
    id: 436691234,
    project: {
      client: {
        id: 923476,
        name: "Client A",
      },
      color: "#ff0000",
      id: 1230994,
      name: "Project A",
    },
    start: new Date("2013-03-11T11:36:00.000Z"),
    stop: new Date("2013-03-11T15:36:00.000Z"),
  })
  expect(results).toContainEqual({
    description: "important work",
    duration: 18400,
    id: 436776436,
    project: {
      client: {
        id: 923476,
        name: "Client A",
      },
      color: "#0000aa",
      id: 1230995,
      name: "Project B",
    },
    start: new Date("2013-03-12T10:32:43.000Z"),
    stop: new Date("2013-03-12T14:32:43.000Z"),
  })
})
