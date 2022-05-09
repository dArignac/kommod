import { Storage, StorageFactory } from "./StorageFactory"
import { StrongholdStorage } from "./StrongholdStorage"

export class StrongholdStorageFactory extends StorageFactory {
  public getInstance(): Storage {
    return new StrongholdStorage()
  }
}
