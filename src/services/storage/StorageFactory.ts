export interface Storage {
  initialize(): Promise<void>
}

export abstract class StorageFactory {
  public abstract getInstance(): Storage
}
