import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { mockTimeEntries, mockUser } from "../../mocks"
import { ProjectStore, UserStore } from "../../store"
import { TogglService } from "./TogglService"

const mock = new MockAdapter(axios)

afterEach(() => mock.resetHandlers())

test("fetches and transforms user correctly", async () => {
  mock.onGet("/me").reply(200, mockUser)

  const user = await TogglService.getInstance().fetchUser()
  const storeProjects = ProjectStore.getRawState().projects
  const storeUser = UserStore.getRawState().user

  expect(storeProjects.length).toBe(2)
  expect(storeProjects).toContainEqual({ id: 1230994, name: "Important project" })
  expect(storeProjects).toContainEqual({ id: 1230995, name: "Important project #2" })
  expect(user.id).toBe(9000)
  expect(user.email).toBe("johnt@swift.com")
  expect(storeUser).toBe(user)
})

test("fetches and transforms todays entries correctly", async () => {
  mock.onGet("/time_entries").reply(200, mockTimeEntries)

  const results = await TogglService.getInstance().fetchTimeEntriesOfToday()

  expect(results.length).toBe(mockTimeEntries.length)

  // sorting
  expect(results[0].id).toBe(436691234)
  expect(results[1].id).toBe(436776436)

  // transformation
  expect(results).toContainEqual({
    description: "Meeting with the client",
    id: 436691234,
    project: {
      id: 1230994,
      name: "Important project",
    },
    start: new Date("2013-03-11T11:36:00.000Z"),
    stop: new Date("2013-03-11T15:36:00.000Z"),
  })
  expect(results).toContainEqual({
    description: "important work",
    id: 436776436,
    project: {
      id: 1230995,
      name: "Important project #2",
    },
    start: new Date("2013-03-12T10:32:43.000Z"),
    stop: new Date("2013-03-12T14:32:43.000Z"),
  })
})
