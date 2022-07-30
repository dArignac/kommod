import { createDir, Dir } from "@tauri-apps/api/fs"
import { dataDir } from "@tauri-apps/api/path"
import { SettingsStore, SettingsStoreInterface } from "../../store"
import { Storage } from "./StorageFactory"
import { Location, Store, Stronghold } from "./stronghold-plugin"

export class StrongholdStorage implements Storage {
  private stronghold: Stronghold | null = null
  private store: Store | null = null
  private location = Location.generic("vault", "token")
  private storeSubscription: (() => void) | undefined

  public async initialize() {
    const dir = `${await dataDir()}kommod`
    await createDir(dir, { dir: Dir.Data, recursive: true })
    this.stronghold = new Stronghold(`${dir}/vault.stronghold`, "")
    this.store = this.stronghold.getStore("vault", [])

    let token: string
    try {
      token = await this.store.get(this.location)
    } catch {
      // if the vault is empty set to the default state value of storageToken
      token = ""
    }

    SettingsStore.update((s) => {
      s.token = token
      s.isStorageReady = true
    })

    this.storeSubscription = SettingsStore.subscribe((s) => s.token, this.handleTokenChange.bind(this))
  }

  public cancelStoreSubscription() {
    if (this.storeSubscription) {
      this.storeSubscription()
    }
  }

  private async handleTokenChange(newValue: string, allState: SettingsStoreInterface, lastValue: string) {
    if (newValue !== lastValue) {
      try {
        await this.store?.insert(this.location, newValue)
        await this.stronghold?.save()

        SettingsStore.update((s) => {
          s.tokenSaveStatus = "success"
        })
      } catch (e) {
        SettingsStore.update((s) => {
          s.tokenSaveStatus = "error"
        })
      }
    }
  }
}
