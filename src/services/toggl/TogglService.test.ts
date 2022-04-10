import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { ProjectStore, UserStore } from "../../store"
import { TogglService } from "./TogglService"
import { TogglTimeEntry } from "./types"

const mock = new MockAdapter(axios)

afterEach(() => mock.resetHandlers())

test("fetches and transforms user correctly", async () => {
  const mockUser = {
    since: 1362575771,
    data: {
      id: 9000,
      api_token: "1971800d4d82861d8f2c1651fea4d212",
      default_wid: 777,
      email: "johnt@swift.com",
      fullname: "John Swift",
      jquery_timeofday_format: "h:i A",
      jquery_date_format: "m/d/Y",
      timeofday_format: "h:mm A",
      date_format: "MM/DD/YYYY",
      store_start_and_stop_time: true,
      beginning_of_week: 0,
      language: "en_US",
      image_url: "https://www.toggl.com/system/avatars/9000/small/open-uri20121116-2767-b1qr8l.png",
      sidebar_piechart: false,
      at: "2013-03-06T12:18:42+00:00",
      retention: 9,
      record_timeline: true,
      render_timeline: true,
      timeline_enabled: true,
      timeline_experiment: true,
      new_blog_post: {
        title: "Increasing perceived performance with _.throttle()",
        url: "http://blog.toggl.com/2013/02/increasing-perceived-performance-with-_throttle/?utm_source=rss&utm_medium=rss&utm_campaign=increasing-perceived-performance-with-_throttle",
      },
      time_entries: [
        {
          id: 435559433,
          wid: 777,
          billable: false,
          start: "2013-03-06T10:08:23+00:00",
          stop: "2013-03-06T14:08:23+00:00",
          duration: 14400,
          description: "Best work so far",
          tags: [""],
          at: "2013-03-06T14:08:23+00:00",
        },
      ],
      projects: [
        {
          id: 1230994,
          wid: 777,
          name: "Important project",
          billable: false,
          active: false,
          at: "2013-03-06T09:13:31+00:00",
          color: "5",
        },
        {
          id: 1230995,
          wid: 778,
          name: "Important project #2",
          billable: false,
          active: false,
          at: "2013-03-06T09:13:31+00:00",
          color: "5",
        },
      ],
      tags: [
        {
          id: 159637,
          wid: 188309,
          name: "billable",
          at: "2013-02-21T14:57:46+00:00",
        },
        {
          id: 159654,
          wid: 188309,
          name: "important",
          at: "2013-02-22T14:06:17+00:00",
        },
      ],
      workspaces: [
        {
          id: 777,
          name: "John's WS",
          premium: true,
          at: "2013-03-06T09:00:30+00:00",
        },
      ],
      clients: [
        {
          id: 923476,
          wid: 777,
          name: "Best client",
          at: "2013-03-06T09:00:30+00:00",
        },
      ],
    },
  }

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
  const mockEntries = [
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

  mock.onGet("/time_entries").reply(200, mockEntries)

  const results = await TogglService.getInstance().fetchTimeEntriesOfToday()

  expect(results.length).toBe(mockEntries.length)
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
