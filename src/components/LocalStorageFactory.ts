import { LocalStorage } from "./LocalStorage"
import { Storage } from "./Storage"
import { StorageFactory } from "./StorageFactory"

export class LocalStorageFactory extends StorageFactory {
  public getInstance(): Storage {
    return new LocalStorage()
  }
}
