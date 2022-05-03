export type Client = {
  id: number
  name: string
}

export type Project = {
  client: Client
  color: string
  id: number
  name: string
}

export type TimeEntry = {
  description: string
  duration: number
  id: number
  project: Project
  start: Date
  stop: Date | null
}

export type User = {
  email: string
  id: number
}
