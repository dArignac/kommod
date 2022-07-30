import addMinutes from "date-fns/addMinutes"
import { TogglClient, TogglProject, TogglTag, TogglTimeEntry, TogglUser, TogglWorkspace } from "../services/toggl/types"
import { Client, Project, TimeEntry } from "../types"

/**
 * This mocks the toggl responses as defined through the toggl types.
 * And it contains the proper types based on the toggl types.
 */

// Clients
const client1 = {
  id: 1,
  name: "Client 1",
}
export const mockTogglClient1: TogglClient = {
  id: client1.id,
  wid: 1,
  name: client1.name,
  at: "2013-03-06T09:00:30+00:00",
}
export const mockClient1: Client = {
  id: client1.id,
  name: client1.name,
}

// Projects
const project1 = {
  active: false,
  actual_hours: 79,
  at: "2013-03-06T09:13:31+00:00",
  auto_estimates: false,
  billable: false,
  cid: 1,
  color: "5",
  created_at: "2013-01-01T10:00:00+00:00",
  currency: "EUR",
  hex_color: "#ff0000",
  id: 1,
  is_private: false,
  name: "Project 1",
  rate: 110,
  template: false,
  wid: 1,
}
export const mockTogglProject1: TogglProject = {
  active: project1.active,
  actual_hours: project1.actual_hours,
  at: project1.at,
  auto_estimates: project1.auto_estimates,
  billable: project1.billable,
  cid: project1.cid,
  color: project1.color,
  created_at: project1.created_at,
  currency: project1.currency,
  hex_color: project1.hex_color,
  id: project1.id,
  is_private: project1.is_private,
  name: project1.name,
  rate: project1.rate,
  template: project1.template,
  wid: project1.wid,
}
export const mockProject1: Project = {
  client: mockClient1,
  color: project1.hex_color,
  id: project1.id,
  name: project1.name,
}
const project2 = {
  hex_color: "#666666",
  id: 2,
  name: "Project 2",
}
export const mockTogglProject2: TogglProject = {
  active: project1.active,
  actual_hours: project1.actual_hours,
  at: project1.at,
  auto_estimates: project1.auto_estimates,
  billable: project1.billable,
  cid: project1.cid,
  color: project1.color,
  created_at: project1.created_at,
  currency: project1.currency,
  hex_color: project2.hex_color,
  id: project2.id,
  is_private: project1.is_private,
  name: project2.name,
  rate: project1.rate,
  template: project1.template,
  wid: project1.wid,
}
export const mockProject2: Project = {
  client: mockClient1,
  color: project2.hex_color,
  id: project2.id,
  name: project2.name,
}

// Time entries
const timeEntry1 = {
  description: "Meeting with the client",
  duration: 14400, // 4:00h
  id: 1,
  start: "2013-03-11T11:36:00+00:00",
  stop: "2013-03-11T15:36:00+00:00",
}
export const mockTogglTimeEntry1: TogglTimeEntry = {
  at: "2013-03-11T15:36:58+00:00",
  billable: true,
  description: timeEntry1.description,
  duration: timeEntry1.duration,
  id: timeEntry1.id,
  pid: 1,
  project_id: 1,
  start: timeEntry1.start,
  stop: timeEntry1.stop,
  tags: [""],
  uid: 1,
  user_id: 1,
  wid: 1,
  workspace_id: 1,
}
export const mockTimeEntry1: TimeEntry = {
  description: timeEntry1.description,
  duration: timeEntry1.duration,
  id: timeEntry1.id,
  project: mockProject1,
  start: new Date(timeEntry1.start),
  stop: new Date(timeEntry1.stop),
}

const timeEntry2 = {
  description: "important work",
  duration: 4800, // 1:20h
  id: 2,
  start: "2013-03-12T10:32:43+00:00",
  stop: "2013-03-12T11:52:43+00:00",
}
export const mockTogglTimeEntry2: TogglTimeEntry = {
  at: "2013-03-12T14:32:43+00:00",
  billable: true,
  description: timeEntry2.description,
  duration: timeEntry2.duration,
  id: timeEntry2.id,
  pid: 1,
  project_id: 1,
  start: timeEntry2.start,
  stop: timeEntry2.stop,
  tags: [""],
  uid: 1,
  user_id: 1,
  wid: 1,
  workspace_id: 1,
}
export const mockTimeEntry2: TimeEntry = {
  description: timeEntry2.description,
  duration: timeEntry2.duration,
  id: timeEntry2.id,
  project: mockProject1,
  start: new Date(timeEntry2.start),
  stop: new Date(timeEntry2.stop),
}

export const mockTimeEntries1: TogglTimeEntry[] = [mockTogglTimeEntry1, mockTogglTimeEntry2]

// a running time entry
const timeEntryRunning = {
  description: "The current, active entry",
  id: 3,
  start: "2013-03-11T11:30:00+00:00",
}
export const mockTogglTimeEntryRunning: TogglTimeEntry = {
  at: "2013-03-11T15:36:58+00:00",
  billable: true,
  description: timeEntryRunning.description,
  id: timeEntryRunning.id,
  pid: 1,
  project_id: 1,
  start: timeEntryRunning.start,
  tags: [""],
  uid: 1,
  user_id: 1,
  wid: 1,
  workspace_id: 1,
}
export const mockTimeEntryRunning: TimeEntry = {
  description: timeEntryRunning.description,
  id: timeEntryRunning.id,
  project: mockProject1,
  start: new Date(timeEntryRunning.start),
}
export const mockTimeEntryStopped: TimeEntry = {
  ...mockTimeEntryRunning,
  stop: addMinutes(mockTimeEntryRunning.start, 15),
  duration: 15,
}

// User
const user: TogglUser = {
  api_token: "1971800d4d82861d8f2c1651fea4d212",
  at: "2013-03-06T12:18:42+00:00",
  beginning_of_week: 0,
  clients: [mockTogglClient1],
  country_id: 1,
  created_at: "2021-11-24T15:01:12+00:00",
  date_format: "MM/DD/YYYY",
  default_workspace_id: 1,
  email: "johnt@swift.com",
  fullname: "John Swift",
  id: 9000,
  intercom_hash: "",
  image_url: "https://www.toggl.com/system/avatars/9000/small/open-uri20121116-2767-b1qr8l.png",
  invitation: {},
  openid_email: "",
  openid_enabled: false,
  projects: [mockTogglProject1, mockTogglProject2],
  tags: [
    {
      at: "2013-02-21T14:57:46+00:00",
      id: 1,
      name: "billable",
      wid: 188309,
    } as TogglTag,
    {
      at: "2013-02-22T14:06:17+00:00",
      id: 2,
      name: "important",
      wid: 188309,
    } as TogglTag,
  ],
  timezone: "Europe/Berlin",
  time_entries: [mockTogglTimeEntry1, mockTogglTimeEntry2],
  updated_at: "2013-03-06T14:30:00+00:00",
  workspaces: [
    {
      id: 1,
      name: "John's WS",
      premium: true,
      at: "2013-03-06T09:00:30+00:00",
    } as TogglWorkspace,
  ],
}
export const mockUser = {
  since: 1362575771,
  data: user,
}
