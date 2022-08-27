import { screen, waitFor } from "@testing-library/react"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { QueryCache, QueryClient } from "react-query"
import { SettingsStore } from "../store"
import { mockTogglClient1, mockTogglProject1, mockTogglProject2, mockUser } from "../tests/mocks"
import { getSkeletonLoading } from "../tests/selectors"
import { renderWithClient } from "../testUtils"
import { DataInitWrapper } from "./DataInitWrapper"

const mock = new MockAdapter(axios)

beforeEach(() => {
  SettingsStore.update((s) => {
    s.token = "token123"
  })
})

test("Renders normally", async () => {
  const queryCache = new QueryCache()
  const queryClient = new QueryClient({ queryCache })

  // mock all calls that happen in the component
  mock.onGet("/me").reply(200, mockUser)
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/clients`).reply(200, [mockTogglClient1])
  mock.onGet(`/workspaces/${mockUser.default_workspace_id}/projects`).reply(200, [mockTogglProject1, mockTogglProject2])
  mock.onGet("/me/time_entries/current").reply(200, null)

  renderWithClient(queryClient, <DataInitWrapper content={<>Solor</>} />)

  // initial rendering is the skeleton loader
  expect(getSkeletonLoading()).toBeVisible()

  // waiting for response
  await waitFor(() => expect(screen.getByText(/Solor/)).toBeVisible())
})

test("Renders error", async () => {
  const queryCache = new QueryCache()
  const queryClient = new QueryClient({ queryCache })

  mock.onGet("/me").networkError()
  renderWithClient(queryClient, <DataInitWrapper content={<>Solor</>} />)

  await waitFor(() => expect(screen.getByText(/Unable to fetch user data from toggl./)).toBeVisible())
})
