import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { App } from "./App"

test("Renders default components", () => {
  // FIXME re-enable
  //   render(<App />)
  //   expect(screen.getByText(/Settings/i)).toBeInTheDocument()
  //   expect(screen.getByText(/El Toggl/)).toBeInTheDocument()
})

test("Navigation to settings works", () => {
  // FIXME re-enable
  //   const leftClick = { button: 0 }
  //   render(<App />)
  //   userEvent.click(screen.getByTestId("link-settings"), leftClick)
  //   expect(screen.getByText(/El Toggl - Settings/)).toBeInTheDocument()
  //   userEvent.click(screen.getByTestId("link-home"), leftClick)
  //   expect(screen.getByText(/El Toggl/)).toBeInTheDocument()
})
