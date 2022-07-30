import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { SettingsStore } from "../store"
import { getSettingsSubmitButton, getSettingsTokenInput } from "../tests/selectors"
import { Settings } from "./Settings"

test("Renders the form", async () => {
  render(<Settings />)
  expect(screen.getByText(/toggl.com Token/i)).toBeInTheDocument()
  expect(screen.getByText(/Submit/)).toBeInTheDocument()
})

test("It saves and loads the token value", async () => {
  await render(<Settings />)

  const input = getSettingsTokenInput()
  const submit = getSettingsSubmitButton()

  expect(input.value).toBe("")
  fireEvent.change(input, { target: { value: "testToken1" } })
  expect(input.value).toBe("testToken1")

  fireEvent.click(submit)

  await waitFor(() => expect(SettingsStore.getRawState().token).toBe("testToken1"))
})

test("Empty token triggers error message", async () => {
  await render(<Settings />)

  const input = getSettingsTokenInput()
  const submit = getSettingsSubmitButton()

  fireEvent.change(input, { target: { value: "" } })
  fireEvent.click(submit)

  await waitFor(() => expect(screen.getByText("Token is required, please provide!")).toBeVisible())
})
