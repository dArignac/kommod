import { LocalStorage } from "./LocalStorage"
import { StorageFactory, Storage } from "./StorageFactory"

export class LocalStorageFactory extends StorageFactory {
  public getInstance(): Storage {
    return new LocalStorage()
  }
}
