export type Client = {
  id: number
  name: string
}

export type Project = {
  client: Client
  color: string
  id: number
  name: string
  workspace: Workspace
}

export type StartStopable = {
  start: Date
  stop?: Date
}

export type TimeEntry = {
  description: string
  duration?: number
  id: number
  project: Project
} & StartStopable

export type User = {
  defaultWorkspaceId: number
  email: string
  id: number
}

export type Workspace = {
  id: number
}
