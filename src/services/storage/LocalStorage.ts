import { SettingsStore, SettingsStoreInterface } from "../../store"
import { Storage } from "./StorageFactory"

export class LocalStorage implements Storage {
  private keyToken = "token"

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
    SettingsStore.subscribe((s) => s.token, this.handleTokenChange.bind(this))
  }

  private handleTokenChange(newValue: string, allState: SettingsStoreInterface, lastValue: string) {
    if (newValue !== lastValue) {
      if (this.setValue(this.keyToken, newValue)) {
        // FIXME add saving state
      } else {
        // FIXME add saving state
      }
    }
  }
}
