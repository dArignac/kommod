// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
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
