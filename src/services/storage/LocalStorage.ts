import { SettingsStore } from "../../store"
import { Storage } from "./StorageFactory"

export class LocalStorage implements Storage {
  private keyToken = "token"
  private storeSubscription: (() => void) | undefined

  private getValue(key: string): string {
    return localStorage.getItem(key) || ""
  }

  private setValue(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value)
      return true
    } catch {
      return false
    }
  }

  public async initialize() {
    SettingsStore.update((s) => {
      s.token = this.getValue(this.keyToken)
      s.isStorageReady = true
    })

    this.storeSubscription = SettingsStore.createReaction(
      (s) => s.token,
      (watched, draft, _, lastWatched) => {
        if (watched !== lastWatched) {
          if (this.setValue(this.keyToken, watched)) {
            draft.tokenSaveStatus = "success"
          } else {
            draft.tokenSaveStatus = "error"
          }
        }
      }
    )
  }

  public cancelStoreSubscription() {
    if (this.storeSubscription) {
      this.storeSubscription()
    }
  }
}
