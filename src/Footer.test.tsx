import { render, screen } from "@testing-library/react"
import React from "react"
import { Footer } from "./Footer"

test("Renders footer", () => {
  render(<Footer />)
  expect(screen.getByText(/Source:/i)).toBeInTheDocument()
  expect(screen.getByText(/Github/)).toHaveAttribute("href", "https://github.com/darignac/el-toggl")
})
