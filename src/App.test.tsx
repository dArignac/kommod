import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import React from "react"
import { App } from "./App"
import { mockTimeEntries1, mockUser } from "./tests/mocks"
import { SettingsStore } from "./store"

const mock = new MockAdapter(axios)

test("Initially shows skeleton loading", () => {
  render(<App />)
  expect(screen.getByTestId("skeleton-loading")).toBeVisible()
})

test("Renders default components", async () => {
  mock.onGet("/me").reply(200, mockUser)
  mock.onGet("/time_entries").reply(200, mockTimeEntries1)

  SettingsStore.update((s) => {
    s.isStorageReady = true
  })

  render(<App />)

  await waitFor(() => {
    expect(screen.getByText(/Settings/i)).toBeInTheDocument()
  })

  expect(screen.getByText(/kommod/)).toBeInTheDocument()
})

test("Navigation to settings works", () => {
  const leftClick = { button: 0 }
  mock.onGet("/me").reply(200, mockUser)
  mock.onGet("/time_entries").reply(200, mockTimeEntries1)

  SettingsStore.update((s) => {
    s.isStorageReady = true
  })

  render(<App />)

  userEvent.click(screen.getByTestId("link-settings"), leftClick)
  expect(screen.getByText(/kommod - Settings/)).toBeInTheDocument()
  userEvent.click(screen.getByTestId("link-home"), leftClick)
  expect(screen.getByText(/kommod/)).toBeInTheDocument()
})
