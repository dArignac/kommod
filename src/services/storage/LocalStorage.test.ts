import { LocalStorage } from "./LocalStorage"

test("sets token", () => {
  jest.spyOn(window.localStorage.__proto__, "setItem")
  window.localStorage.__proto__.setItem = jest.fn()

  const ls = new LocalStorage()

  expect(ls.setToken("value")).toBeTruthy()
  expect(localStorage.setItem).toBeCalledWith("token", "value")
})

test("gets token", () => {
  jest.spyOn(window.localStorage.__proto__, "getItem")
  window.localStorage.__proto__.getItem = jest.fn()

  const ls = new LocalStorage()
  ls.getToken()

  expect(localStorage.getItem).toBeCalledWith("token")
})
