import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import { SettingsStore } from "../store"
import { Settings } from "./Settings"

test("Renders the form", async () => {
  render(<Settings />)
  expect(screen.getByText(/toggl.com Token/i)).toBeInTheDocument()
  expect(screen.getByText(/Submit/)).toBeInTheDocument()
})

test("It saves and loads the token value", async () => {
  await render(<Settings />)

  const input = screen.getByTestId("token") as HTMLInputElement
  const submit = screen.getByTestId("submit") as HTMLButtonElement

  expect(input.value).toBe("")
  fireEvent.change(input, { target: { value: "testToken1" } })
  expect(input.value).toBe("testToken1")

  fireEvent.click(submit)

  await waitFor(() => expect(SettingsStore.getRawState().token).toBe("testToken1"))
})

test("Empty token triggers error message", async () => {
  await render(<Settings />)

  const input = screen.getByTestId("token") as HTMLInputElement
  const submit = screen.getByTestId("submit") as HTMLButtonElement

  fireEvent.change(input, { target: { value: "" } })
  fireEvent.click(submit)

  await waitFor(() => expect(screen.getByText("Token is required, please provide!")).toBeVisible())
})
