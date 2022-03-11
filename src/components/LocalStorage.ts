import { Storage } from "./Storage"

export class LocalStorage implements Storage {
  getValue(key: string): string {
    return localStorage.getItem(key) || ""
  }
  setValue(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value)
      return true
    } catch {
      return false
    }
  }
}
