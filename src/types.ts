export type User = {
  email: string
  id: number
}

export type TimeEntry = {
  billable: boolean
  description: string
  id: number
  start: Date
  stop: Date
}
