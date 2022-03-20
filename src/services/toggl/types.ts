export type TogglTimeEntry = {
  id: number
  guid: string
  wid: number
  pid: number
  tid: number
  created_with: string
  billable: boolean
  start: string
  stop: string
  duration: number
  duronly: boolean
  description: string
  tags: string[]
  at: string
}

export type TimeEntry = {
  billable: boolean
  description: string
  id: number
  start: Date
  stop: Date
}
