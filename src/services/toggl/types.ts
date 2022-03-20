export type TogglTimeEntry = {
  id: number
  guid: string
  wid: number
  pid: number
  tid: number
  created_with: string
  billable: boolean
  start: Date
  stop: Date
  duration: number
  duronly: boolean
  description: string
  tags: string[]
  at: Date
}
