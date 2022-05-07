import { render, screen } from "@testing-library/react"
import { BaseLayout } from "./BaseLayout"

test("Renders layout", () => {
  render(<BaseLayout content={<div>ze content</div>} />)
  // header
  expect(screen.getByText(/kommod/)).toBeInTheDocument()
  // content
  expect(screen.getByText(/ze content/)).toBeInTheDocument()
  // footer
  expect(screen.getByText(/Source:/)).toBeInTheDocument()
})
