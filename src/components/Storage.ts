export interface Storage {
  getValue(key: string): string
  setValue(key: string, value: string): boolean
}
