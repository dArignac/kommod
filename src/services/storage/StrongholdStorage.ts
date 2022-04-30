import { createDir, Dir } from "@tauri-apps/api/fs"
import { dataDir } from "@tauri-apps/api/path"
import { Location, Store, Stronghold } from "./stronghold-plugin"
import { SettingsStore, SettingsStoreInterface } from "../../store"
import { Storage } from "./StorageFactory"

export class StrongholdStorage implements Storage {
  private stronghold: Stronghold | null = null
  private store: Store | null = null
  private location = Location.generic("vault", "token")

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

    SettingsStore.subscribe((s) => s.token, this.handleTokenChange.bind(this))
  }

  private async handleTokenChange(newValue: string, allState: SettingsStoreInterface, lastValue: string) {
    if (newValue !== lastValue) {
      try {
        await this.store?.insert(this.location, newValue)
        await this.stronghold?.save()
        // FIXME add saving state
      } catch {
        // FIXME add saving state
      }
    }
  }
}
