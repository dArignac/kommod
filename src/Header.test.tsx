import { render, screen } from "@testing-library/react"
import React from "react"
import { Header } from "./Header"

test("Renders navigation", async () => {
  render(<Header />)
  expect(screen.getByText(/El Toggl/i)).toBeInTheDocument()
  expect(screen.getByText(/Settings/i)).toBeInTheDocument()
})
