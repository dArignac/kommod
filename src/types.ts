export type Client = {
  id: number
  name: string
}

export type Project = {
  client: Client
  id: number
  name: string
}

export type TimeEntry = {
  billable: boolean
  description: string
  id: number
  project: Project
  start: Date
  stop: Date
}

export type User = {
  email: string
  id: number
}
