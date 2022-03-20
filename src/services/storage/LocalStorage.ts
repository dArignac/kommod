import { Storage } from "./StorageFactory"

export class LocalStorage implements Storage {
  private keyToken = "token"

  private getValue(key: string): string {
    return localStorage.getItem(key) || ""
  }

  private setValue(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value)
      return true
    } catch {
      return false
    }
  }

  public getToken(): string {
    return this.getValue(this.keyToken)
  }

  public setToken(value: string): boolean {
    return this.setValue(this.keyToken, value)
  }
}
