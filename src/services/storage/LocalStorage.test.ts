import { SettingsStore } from "../../store"
import { LocalStorage } from "./LocalStorage"

test("initializes and gets token", async () => {
  jest.spyOn(window.localStorage.__proto__, "getItem")
  window.localStorage.__proto__.getItem = jest.fn()

  const ls = new LocalStorage()
  await ls.initialize()

  expect(localStorage.getItem).toBeCalledWith("token")
})

export async function waitSeconds(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000 * seconds)
  })
}

test("sets token", async () => {
  jest.spyOn(window.localStorage.__proto__, "setItem")
  window.localStorage.__proto__.setItem = jest.fn()

  const ls = new LocalStorage()
  await ls.initialize()

  SettingsStore.update((s) => {
    s.token = "test123"
  })

  expect(localStorage.setItem).toBeCalledWith("token", "test123")
})
