import { render, screen } from "@testing-library/react"
import React from "react"
import { Settings } from "./Settings"

test("Renders the form", async () => {
  render(<Settings />)
  expect(screen.getByText(/toggl.com Token/i)).toBeInTheDocument()
  expect(screen.getByText(/Submit/)).toBeInTheDocument()
})

test("It saves and loads the token value", async () => {
  render(<Settings />)
})
