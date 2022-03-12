import { LocalStorage } from "./LocalStorage"

test("sets value", () => {
  jest.spyOn(window.localStorage.__proto__, "setItem")
  window.localStorage.__proto__.setItem = jest.fn()

  const ls = new LocalStorage()

  expect(ls.setValue("key", "value")).toBeTruthy()
  expect(localStorage.setItem).toBeCalledWith("key", "value")
})

test("gets value", () => {
  jest.spyOn(window.localStorage.__proto__, "getItem")
  window.localStorage.__proto__.getItem = jest.fn()

  const ls = new LocalStorage()
  ls.getValue("key")

  expect(localStorage.getItem).toBeCalledWith("key")
})
