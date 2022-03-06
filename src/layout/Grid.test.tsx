import { render, screen } from "@testing-library/react"
import React from "react"
import { Grid } from "./Grid"

test("Renders Grid", () => {
  render(<Grid topRowLeft={<>TopRowLeft</>} topRowRight={<>TopRowRight</>} mainRow={<>MainRow</>} footerRow={<>FooterRow</>} />)
  expect(screen.getByText(/TopRowLeft/)).toBeInTheDocument()
  expect(screen.getByText(/TopRowRight/)).toBeInTheDocument()
  expect(screen.getByText(/MainRow/)).toBeInTheDocument()
  expect(screen.getByText(/FooterRow/)).toBeInTheDocument()
})
