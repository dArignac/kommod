import { render, screen } from "@testing-library/react"
import React from "react"
import { App } from "./App"

test("Renders default components", () => {
  render(<App />)
  expect(screen.getByText(/Settings/i)).toBeInTheDocument()
  expect(screen.getByText(/MainRow/i)).toBeInTheDocument()
})
