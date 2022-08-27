import addMinutes from "date-fns/addMinutes"
import { TogglClient, TogglProject, TogglTag, TogglTimeEntry, TogglUser, TogglWorkspace } from "../services/toggl/types"
import { Client, Project, TimeEntry, Workspace } from "../types"

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
  at: "2013-03-06T09:00:30+00:00",
  foreign_id: "",
  id: client1.id,
  name: client1.name,
  wid: 1,
}
export const mockClient1: Client = {
  id: client1.id,
  name: client1.name,
}

// Projects
const workspace1 = {
  id: 1,
}
export const mockWorkspace1: Workspace = {
  id: workspace1.id,
}

const project1 = {
  active: false,
  actual_hours: 79,
  at: "2013-03-06T09:13:31+00:00",
  auto_estimates: false,
  billable: false,
  cid: 1,
  client_id: 1,
  color: "5",
  created_at: "2013-01-01T10:00:00+00:00",
  currency: "EUR",
  current_period: {
    end_date: "",
    start_date: "",
  },
  estimated_hours: 900,
  fixed_fee: 120,
  foreign_id: 1,
  id: 1,
  is_private: false,
  name: "Project 1",
  rate: 110,
  rate_last_updated: "2013-01-01T10:00:00+00:00",
  recurring: false,
  template: false,
  wid: 1,
  workspace_id: 1,
}
export const mockTogglProject1: TogglProject = {
  active: project1.active,
  actual_hours: project1.actual_hours,
  at: project1.at,
  auto_estimates: project1.auto_estimates,
  billable: project1.billable,
  cid: project1.cid,
  client_id: project1.client_id,
  color: project1.color,
  created_at: project1.created_at,
  currency: project1.currency,
  current_period: project1.current_period,
  estimated_hours: project1.estimated_hours,
  fixed_fee: project1.fixed_fee,
  foreign_id: project1.foreign_id,
  id: project1.id,
  is_private: project1.is_private,
  name: project1.name,
  rate: project1.rate,
  rate_last_updated: project1.rate_last_updated,
  recurring: project1.recurring,
  template: project1.template,
  wid: project1.wid,
  workspace_id: project1.workspace_id,
}
export const mockProject1: Project = {
  client: mockClient1,
  color: project1.color,
  id: project1.id,
  name: project1.name,
  workspace: mockWorkspace1,
}

const project2 = {
  color: "4",
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
  client_id: project1.client_id,
  color: project2.color,
  created_at: project1.created_at,
  currency: project1.currency,
  current_period: project1.current_period,
  estimated_hours: project1.estimated_hours,
  fixed_fee: project1.fixed_fee,
  foreign_id: project1.foreign_id,
  id: project2.id,
  is_private: project1.is_private,
  name: project2.name,
  rate: project1.rate,
  rate_last_updated: project1.rate_last_updated,
  recurring: project1.recurring,
  template: project1.template,
  wid: project1.wid,
  workspace_id: project1.workspace_id,
}
export const mockProject2: Project = {
  client: mockClient1,
  color: project2.color,
  id: project2.id,
  name: project2.name,
  workspace: mockWorkspace1,
}

// Time entries
const timeEntry1 = {
  description: "Test entry 1 2022-08-26 11:00:00-15:00:00",
  duration: 14400, // 4:00h
  id: 1,
  start: "2022-08-26T11:00:00+00:00",
  stop: "2022-08-26T15:00:00+00:00",
}
const timeEntry2 = {
  description: "Test entry 2 2022-08-26 23:00:00-00:00:00",
  duration: 3600, // 1:00h
  id: 2,
  start: "2022-08-26T23:00:00+00:00",
  stop: "2022-08-27T00:00:00+00:00",
}
const timeEntry3 = {
  description: "Test entry 3 2022-08-27 00:00:00-01:00:00",
  duration: 3600, // 1:00h
  id: 3,
  start: "2022-08-27T00:00:00+00:00",
  stop: "2022-08-27T01:00:00+00:00",
}
const timeEntry4 = {
  description: "Test entry 4 2022-08-27 01:00:00-02:00:00",
  duration: 3600, // 1:00h
  id: 4,
  start: "2022-08-27T01:00:00+00:00",
  stop: "2022-08-27T02:00:00+00:00",
}
const timeEntry5 = {
  description: "Test entry 5 2022-08-27 02:00:00-03:00:00",
  duration: 3600, // 1:00h
  id: 5,
  start: "2022-08-27T02:00:00+00:00",
  stop: "2022-08-27T03:00:00+00:00",
}
const timeEntry6 = {
  description: "Test entry 6 2022-08-27 10:32:43-10:52:43",
  duration: 4800, // 1:20h
  id: 6,
  start: "2022-08-27T10:32:43+00:00",
  stop: "2022-08-27T11:52:43+00:00",
}
export const mockTogglTimeEntry1: TogglTimeEntry = {
  at: "2022-08-25T15:36:58+00:00",
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
export const mockTogglTimeEntry2: TogglTimeEntry = {
  ...mockTogglTimeEntry1,
  description: timeEntry2.description,
  duration: timeEntry2.duration,
  id: timeEntry2.id,
  start: timeEntry2.start,
  stop: timeEntry2.stop,
}
export const mockTogglTimeEntry3: TogglTimeEntry = {
  ...mockTogglTimeEntry1,
  description: timeEntry3.description,
  duration: timeEntry3.duration,
  id: timeEntry3.id,
  start: timeEntry3.start,
  stop: timeEntry3.stop,
}
export const mockTogglTimeEntry4: TogglTimeEntry = {
  ...mockTogglTimeEntry1,
  description: timeEntry4.description,
  duration: timeEntry4.duration,
  id: timeEntry4.id,
  start: timeEntry4.start,
  stop: timeEntry4.stop,
}
export const mockTogglTimeEntry5: TogglTimeEntry = {
  ...mockTogglTimeEntry1,
  description: timeEntry5.description,
  duration: timeEntry5.duration,
  id: timeEntry5.id,
  start: timeEntry5.start,
  stop: timeEntry5.stop,
}
export const mockTogglTimeEntry6: TogglTimeEntry = {
  ...mockTogglTimeEntry1,
  description: timeEntry6.description,
  duration: timeEntry6.duration,
  id: timeEntry6.id,
  start: timeEntry6.start,
  stop: timeEntry6.stop,
}
export const mockTimeEntry1: TimeEntry = {
  description: timeEntry1.description,
  duration: timeEntry1.duration,
  id: timeEntry1.id,
  project: mockProject1,
  start: new Date(timeEntry1.start),
  stop: new Date(timeEntry1.stop),
}
export const mockTimeEntry2: TimeEntry = {
  description: timeEntry2.description,
  duration: timeEntry2.duration,
  id: timeEntry2.id,
  project: mockProject1,
  start: new Date(timeEntry2.start),
  stop: new Date(timeEntry2.stop),
}
export const mockTimeEntry3: TimeEntry = {
  description: timeEntry3.description,
  duration: timeEntry3.duration,
  id: timeEntry3.id,
  project: mockProject1,
  start: new Date(timeEntry3.start),
  stop: new Date(timeEntry3.stop),
}
export const mockTimeEntry4: TimeEntry = {
  description: timeEntry4.description,
  duration: timeEntry4.duration,
  id: timeEntry4.id,
  project: mockProject1,
  start: new Date(timeEntry4.start),
  stop: new Date(timeEntry4.stop),
}
export const mockTimeEntry5: TimeEntry = {
  description: timeEntry5.description,
  duration: timeEntry5.duration,
  id: timeEntry5.id,
  project: mockProject1,
  start: new Date(timeEntry5.start),
  stop: new Date(timeEntry5.stop),
}
export const mockTimeEntry6: TimeEntry = {
  description: timeEntry6.description,
  duration: timeEntry6.duration,
  id: timeEntry6.id,
  project: mockProject1,
  start: new Date(timeEntry6.start),
  stop: new Date(timeEntry6.stop),
}

export const mockTogglTimeEntries1: TogglTimeEntry[] = [
  mockTogglTimeEntry1,
  mockTogglTimeEntry2,
  mockTogglTimeEntry3,
  mockTogglTimeEntry4,
  mockTogglTimeEntry5,
  mockTogglTimeEntry6,
]

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
export const mockUser: TogglUser = {
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
  time_entries: [mockTogglTimeEntry1, mockTogglTimeEntry6],
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
