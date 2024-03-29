export type TogglBlogPost = {
  title: string
  url: string
}

export type TogglTimeEntry = {
  at: string
  billable: boolean
  description: string
  duration?: number
  duronly?: boolean
  id: number
  pid: number
  project_id: number
  server_deleted_at?: string
  start: string
  stop?: string
  tag_ids?: number[]
  tags: string[]
  task_id?: number
  tid?: number
  uid: number
  user_id: number
  wid: number
  workspace_id: number
}

export type TogglClient = {
  at: string
  foreign_id: string
  id: number
  name: string
  server_deleted_at?: string
  wid: number
}

export type TogglInvitation = {}

export type TogglPeriod = {
  end_date: string
  start_date: string
}

export type TogglRecurringParameterItems = {
  custom_period: number
  estimated_seconds: number
  parameter_end_date: string
  parameter_start_date: string
  period: string
  project_start_date: string
}

export type TogglRecurringParameters = {
  items: TogglRecurringParameterItems
}

export type TogglProject = {
  active: boolean
  actual_hours: number
  at: string
  auto_estimates: boolean
  billable: boolean
  cid: number
  client_id: number
  color: string
  created_at: string
  currency: string
  current_period: TogglPeriod
  estimated_hours: number
  fixed_fee: number
  foreign_id: number
  id: number
  is_private: boolean
  name: string
  rate: number
  rate_last_updated: string
  recurring: boolean
  recurring_parameters?: TogglRecurringParameters
  server_deleted_at?: string
  template: boolean
  wid: number
  workspace_id: number
}

export type TogglTag = {
  at: string
  id: number
  name: string
  wid: number
}

export type TogglWorkspace = {
  admin: boolean
  at: string
  default_currency: string
  default_hourly_rate: string
  ical_enabled: boolean
  ical_url: string
  id: number
  logo_url: string
  name: string
  only_admins_may_create_projects: boolean
  only_admins_see_billable_rates: boolean
  only_admins_see_team_dashboard: boolean
  premium: boolean
  profile: number
  projects_billable_by_default: boolean
  rounding_minutes: number
  rounding: number
}

export type TogglUser = {
  api_token: string
  at: string
  beginning_of_week: number
  clients: TogglClient[]
  country_id: number
  created_at: string
  date_format: string
  default_workspace_id: number
  email: string
  fullname: string
  id: number
  image_url: string
  intercom_hash: string
  invitation: TogglInvitation
  openid_email: string
  openid_enabled: boolean
  projects: TogglProject[]
  tags: TogglTag[]
  time_entries: TogglTimeEntry[]
  timezone: string
  updated_at: string
  workspaces: TogglWorkspace[]
}
