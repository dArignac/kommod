import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { App } from "./App"

test("Renders default components", () => {
  render(<App />)
  expect(screen.getByText(/Settings/i)).toBeInTheDocument()
  expect(screen.getByText(/MainRow/i)).toBeInTheDocument()
  expect(screen.getByText(/El Toggl/)).toBeInTheDocument()
})

test("Navigation to settings works", () => {
  const leftClick = { button: 0 }
  render(<App />)
  userEvent.click(screen.getByTestId("link-settings"), leftClick)
  expect(screen.getByText(/TODO Settings/)).toBeInTheDocument()
})
