// FIXME to generic, add at least specific methods for token etc.
export interface Storage {
  getValue(key: string): string
  setValue(key: string, value: string): boolean
}

export abstract class StorageFactory {
  public abstract getInstance(): Storage
}
