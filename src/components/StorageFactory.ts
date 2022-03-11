import { Storage } from "./Storage"

export abstract class StorageFactory {
  public abstract getInstance(): Storage
}
