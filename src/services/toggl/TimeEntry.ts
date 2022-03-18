export interface TimeEntry {
  id: number
  wid: number
  pid: number
  tid: number
  createdWith: string
  isBillable: boolean
  start: Date
  stop: Date
  duration: number
  durationOnly: boolean
  description: string
  tags: string[]
  at: Date
}
