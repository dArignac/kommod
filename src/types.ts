export type Project = {
  id: number
  name: string
}

export type TimeEntry = {
  billable: boolean
  description: string
  id: number
  start: Date
  stop: Date
}

export type User = {
  email: string
  id: number
}
