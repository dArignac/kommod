import { cleanup, render, screen } from "@testing-library/react"
import MatchMediaMock from "jest-matchmedia-mock"
import React from "react"
import { Settings } from "./Settings"

let matchMedia: MatchMediaMock

beforeEach(cleanup)

beforeAll(() => {
  matchMedia = new MatchMediaMock()
})

afterEach(() => {
  matchMedia.clear()
})

test("Renders the form", async () => {
  render(<Settings />)
  expect(screen.getByText(/toggl.com Token/i)).toBeInTheDocument()
  expect(screen.getByText(/Submit/)).toBeInTheDocument()
})

test("It saves and loads the token value", async () => {
  render(<Settings />)
})
