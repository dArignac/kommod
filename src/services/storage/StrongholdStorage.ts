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
    const dir = `${await dataDir()}el-toggl`
    await createDir(dir, { dir: Dir.Data, recursive: true })
    this.stronghold = new Stronghold(`${dir}/vault.stronghold`, "")
    this.store = this.stronghold?.getStore("vault", [])

    let token: string
    try {
      token = await this.store?.get(this.location)
    } catch {
      // if the vault is empty set to the default state value of storageToken
      token = ""
    }

    SettingsStore.update((s) => {
      s.token = token
      s.isStorageReady = true
    })

    this.storeSubscription = SettingsStore.subscribe((s) => s.token, this.handleTokenChange.bind(this))

    // FIXME we cannot use SettingsStore.createReaction here as the update function cannot call async code
    // FIXME so there is no way to update the store after the async stuff in handleTokenChange has been executed
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
      } catch (e) {
        // FIXME remove console
        console.log("error", e)
      }
    }
  }
}
