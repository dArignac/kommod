import { render, screen } from "@testing-library/react"
import React from "react"
import { Navigation } from "./Navigation"

test("Renders navigation", async () => {
  render(<Navigation />)
  expect(screen.getByText(/Settings/i)).toBeInTheDocument()
})
