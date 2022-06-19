import { screen, waitFor } from "@testing-library/react"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { QueryCache, QueryClient } from "react-query"
import { SettingsStore } from "../store"
import { mockUser } from "../tests/mocks"
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

  mock.onGet("/me").reply(200, mockUser)
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
