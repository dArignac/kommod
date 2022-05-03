import { registerInDevtools, Store } from "pullstate"
import { config } from "./config"
import { Client, Project, User } from "./types"

interface ClientStoreInterface {
  clients: Client[]
}

export const ClientStore = new Store<ClientStoreInterface>({
  clients: [],
})

interface ProjectStoreInterface {
  projects: Project[]
}

export const ProjectStore = new Store<ProjectStoreInterface>({
  projects: [],
})

export interface SettingsStoreInterface {
  isStorageReady: boolean
  token: string
  tokenSaveStatus: "na" | "success" | "error"
}

export const SettingsStore = new Store<SettingsStoreInterface>({
  isStorageReady: false,
  token: "",
  tokenSaveStatus: "na",
})

export interface SingleDayViewStoreInterface {
  day: Date
}

export const SingleDayViewStore = new Store<SingleDayViewStoreInterface>({
  day: new Date(),
})

interface UserStoreInterface {
  user: User
}

export const UserStore = new Store<UserStoreInterface>({
  user: {
    email: "",
    id: 0,
  },
})

if (config.development.reduxDevTools) {
  registerInDevtools({ ClientStore, ProjectStore, SettingsStore, SingleDayViewStore, UserStore })
}
