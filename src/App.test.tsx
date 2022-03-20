import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MatchMediaMock from "jest-matchmedia-mock"
import React from "react"
import { App } from "./App"

let matchMedia: MatchMediaMock

beforeAll(() => {
  matchMedia = new MatchMediaMock()
})

afterEach(() => {
  matchMedia.clear()
})

test("Renders default components", () => {
  render(<App />)
  expect(screen.getByText(/Settings/i)).toBeInTheDocument()
  expect(screen.getByText(/El Toggl/)).toBeInTheDocument()
})

test("Navigation to settings works", () => {
  const leftClick = { button: 0 }
  render(<App />)
  userEvent.click(screen.getByTestId("link-settings"), leftClick)
  expect(screen.getByText(/El Toggl - Settings/)).toBeInTheDocument()
  userEvent.click(screen.getByTestId("link-home"), leftClick)
  expect(screen.getByText(/El Toggl/)).toBeInTheDocument()
})
