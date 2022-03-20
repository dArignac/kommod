import { LocalStorage } from "./LocalStorage"
import { LocalStorageFactory } from "./LocalStorageFactory"

test("Return LocalStorage instance", () => {
  expect(new LocalStorageFactory().getInstance()).toBeInstanceOf(LocalStorage)
})
