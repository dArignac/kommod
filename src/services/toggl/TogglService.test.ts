import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { TogglService } from "./TogglService"
import { TogglTimeEntry } from "./types"

const mock = new MockAdapter(axios)

afterEach(() => mock.resetHandlers())

test("fetches and transforms todays entries correctly", async () => {
  const entries = [
    {
      id: 436691234,
      wid: 777,
      pid: 123,
      billable: true,
      start: "2013-03-11T11:36:00+00:00",
      stop: "2013-03-11T15:36:00+00:00",
      duration: 14400,
      description: "Meeting with the client",
      tags: [""],
      at: "2013-03-11T15:36:58+00:00",
    } as TogglTimeEntry,
    {
      id: 436776436,
      wid: 777,
      billable: false,
      start: "2013-03-12T10:32:43+00:00",
      stop: "2013-03-12T14:32:43+00:00",
      duration: 18400,
      description: "important work",
      tags: [""],
      at: "2013-03-12T14:32:43+00:00",
    } as TogglTimeEntry,
  ]

  mock.onGet("/time_entries").reply(200, entries)

  const results = await TogglService.getInstance().fetchTimeEntriesOfToday()

  expect(results.length).toBe(entries.length)
  // sorting
  expect(results[0].id).toBe(436691234)
  expect(results[1].id).toBe(436776436)
  // transformation
  expect(Object.keys(results[0]).length).toBe(4)
  expect(results[0].description).toBe("Meeting with the client")
  expect(results[0].id).toBe(436691234)
  expect(results[0].start.toISOString()).toBe("2013-03-11T11:36:00.000Z")
  expect(results[0].stop.toISOString()).toBe("2013-03-11T15:36:00.000Z")
  // transformation
  expect(Object.keys(results[1]).length).toBe(4)
  expect(results[1].description).toBe("important work")
  expect(results[1].id).toBe(436776436)
  expect(results[1].start.toISOString()).toBe("2013-03-12T10:32:43.000Z")
  expect(results[1].stop.toISOString()).toBe("2013-03-12T14:32:43.000Z")
})
