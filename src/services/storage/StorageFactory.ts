// FIXME to generic, add at least specific methods for token etc.
export interface Storage {
  getToken(): string
  setToken(value: string): boolean
}

export abstract class StorageFactory {
  public abstract getInstance(): Storage
}
