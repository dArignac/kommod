import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { App } from "./App"
import { SettingsStore } from "./store"
import { mockTimeEntries1, mockUser } from "./tests/mocks"
import { getHomeLink, getSettingsLink, getSkeletonLoading } from "./tests/selectors"

const mock = new MockAdapter(axios)

test("Initially shows skeleton loading", () => {
  render(<App />)
  expect(getSkeletonLoading()).toBeVisible()
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
  mock.onGet("/me").reply(200, mockUser)
  mock.onGet("/time_entries").reply(200, mockTimeEntries1)

  SettingsStore.update((s) => {
    s.isStorageReady = true
  })

  render(<App />)

  fireEvent.click(getSettingsLink())
  expect(screen.getByText(/kommod - Settings/)).toBeInTheDocument()
  fireEvent.click(getHomeLink())
  expect(screen.getByText(/kommod/)).toBeInTheDocument()
})
