import { render, screen } from "@testing-library/react"
import React from "react"
import { MainScreen } from "./MainScreen"

test("Renders default components", () => {
  render(<MainScreen />)
  expect(screen.getByText(/Settings/i)).toBeInTheDocument()
  expect(screen.getByText(/MainRow/i)).toBeInTheDocument()
})
