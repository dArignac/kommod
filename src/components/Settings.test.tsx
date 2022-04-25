import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { act } from "react-dom/test-utils"
import { SettingsStore } from "../store"
import { Settings } from "./Settings"

test("Renders the form", async () => {
  render(<Settings />)
  expect(screen.getByText(/toggl.com Token/i)).toBeInTheDocument()
  expect(screen.getByText(/Submit/)).toBeInTheDocument()
})

test("It saves and loads the token value", async () => {
  render(<Settings />)

  const input = screen.getByTestId("token") as HTMLInputElement
  const submit = screen.getByTestId("submit") as HTMLButtonElement

  expect(input.value).toBe("")
  fireEvent.change(input, { target: { value: "testToken1" } })
  expect(input.value).toBe("testToken1")

  await act(() => {
    fireEvent.click(submit)
  })

  expect(SettingsStore.getRawState().token).toBe("testToken1")
})
