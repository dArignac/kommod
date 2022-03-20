import { useQuery } from "react-query"
import { ServiceFactory } from "../services/ServiceFactory"
import { TimeEntry } from "../services/toggl/types"

export function TimeEntryList() {
  const { status, data, error } = useQuery<TimeEntry[], Error>(
    ["todaysTimeEntries"],
    async () => {
      return ServiceFactory.getInstance().getTogglService().fetchTimeEntriesOfToday()
    },
    { retry: 0 }
  )
  data?.map((entry) => console.log(entry))
  return <>list</>
}
