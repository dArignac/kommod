import { registerInDevtools, Store } from "pullstate"
import { config } from "./config"
import { Client, Project, User } from "./types"

export type BookingStoreTimes = {
  timeStart?: string
  timeStop?: string
}

type BookingStoreType = {
  day: Date
  projectId?: number
  timeEntryDescription?: string
  timEntryId?: number
} & BookingStoreTimes

export const BookingStore = new Store<BookingStoreType>({
  day: new Date(),
})

interface TogglStoreInterface {
  clients: Client[]
  projects: Project[]
  tasks: string[]
  user: User
}

export const TogglStore = new Store<TogglStoreInterface>({
  clients: [],
  projects: [],
  tasks: [],
  user: {
    email: "",
    id: 0,
  },
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

if (config.development.reduxDevTools) {
  registerInDevtools({ BookingStore, TogglStore, SettingsStore, SingleDayViewStore })
}
