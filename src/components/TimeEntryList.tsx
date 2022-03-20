import axios from "axios"
import { useQuery } from "react-query"
import { ServiceFactory } from "../services/ServiceFactory"
import { TogglTimeEntry } from "../services/toggl/types"

// FIXME tests and mocks and bla
// FIXME refactored to central place, Toggl Service or so, that abstract toggl specifics
const ax = axios.create({
  baseURL: "https://api.track.toggl.com/api/v8",
  auth: {
    username: ServiceFactory.getInstance().getStorage().getValue("token"),
    password: "api_token",
  },
})

// FIXME use axios transformResponse to map the toggl originated structure (todo create type) to a well formed structure (todo create type) -> aka a mapper
// FIXME refactor access to a service

export function TimeEntryList() {
  const { status, data, error } = useQuery<TogglTimeEntry[], Error>(
    ["todaysTimeEntries"],
    async () => {
      const { data } = await ax.get<TogglTimeEntry[]>("/time_entries", { params: { start_date: "2022-03-18T00:00:00+02:00" } })
      return data
    },
    { retry: 0 }
  )
  data?.map((entry) => console.log(entry.description))
  return <>list</>
}
