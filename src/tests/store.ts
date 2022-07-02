import { TimeBookingStore, SettingsStore, SingleDayViewStore, TogglStore } from "../store"

export function resetBookingStore(projectId?: number) {
  TimeBookingStore.update((s) => {
    s.day = new Date()
    s.projectId = projectId
    s.description = undefined
    s.entry = undefined
    s.start = undefined
    s.stop = undefined
  })
}

export function resetStores() {
  resetBookingStore()

  TogglStore.update((s) => {
    s.clients = []
    s.projects = []
    s.tasks = []
    s.user = {
      email: "",
      id: 0,
    }
  })

  SettingsStore.update((s) => {
    s.isStorageReady = false
    s.token = ""
    s.tokenSaveStatus = "na"
  })

  SingleDayViewStore.update((s) => {
    s.day = new Date()
  })
}
