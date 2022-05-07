import { render, screen } from "@testing-library/react"
import React from "react"
import { Header } from "./Header"

test("Renders navigation", async () => {
  render(<Header />)
  expect(screen.getByText(/kommod/i)).toBeInTheDocument()
  expect(screen.getByText(/Settings/i)).toBeInTheDocument()
})
