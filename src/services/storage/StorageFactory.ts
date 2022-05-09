export interface Storage {
  initialize(): Promise<void>
  cancelStoreSubscription(): void
}

export abstract class StorageFactory {
  public abstract getInstance(): Storage
}
