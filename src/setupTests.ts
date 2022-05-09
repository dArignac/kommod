// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
import { randomFillSync } from "crypto"
import MatchMediaMock from "jest-matchmedia-mock"
import { setLogger } from "react-query"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let matchMedia = new MatchMediaMock()

// disable react-query logging in tests
setLogger({
  log: (message) => {},
  warn: (message) => {},
  error: (message) => {},
})

Object.defineProperty(window.self, "crypto", {
  value: {
    getRandomValues: function <T extends ArrayBufferView | null>(array: T): T {
      //@ts-ignore
      return randomFillSync(array)
    },
  },
})

window.__TAURI_IPC__ = () => {}
