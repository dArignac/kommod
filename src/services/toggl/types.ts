export type TogglBlogPost = {
  title: string
  url: string
}

export type TogglTimeEntry = {
  at: string
  billable: boolean
  created_with: string
  description: string
  duration: number
  duronly: boolean
  guid: string
  id: number
  pid: number
  start: string
  stop: string
  tags: string[]
  tid: number
  wid: number
}

export type TogglClient = {
  at: string
  id: number
  name: string
  wid: number
}

export type TogglInvitation = {}

export type TogglProject = {
  active: boolean
  actual_hours: number
  at: string
  auto_estimates: boolean
  billable: boolean
  cid: number
  color: string
  created_at: string
  currency: string
  hex_color: string
  id: number
  is_private: boolean
  name: string
  rate: number
  template: boolean
  wid: number
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
  created_at: string
  date_format: string
  default_wid: number
  duration_format: string
  email: string
  fullname: string
  id: number
  image_url: string
  invitation: TogglInvitation
  jquery_date_format: string
  jquery_timeofday_format: string
  language: string
  openid_enabled: boolean
  projects: TogglProject[]
  record_timeline: boolean
  send_product_emails: boolean
  send_timer_notifications: boolean
  send_weekly_report: boolean
  should_upgrade: boolean
  store_start_and_stop_time: boolean
  tags: TogglTag[]
  time_entries: TogglTimeEntry[]
  timeofday_format: string
  timezone: string
  workspaces: TogglWorkspace[]
}

export type TogglUserResponse = {
  data: TogglUser
  since: string
}
