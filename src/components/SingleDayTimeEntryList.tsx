import format from "date-fns/format"
import { useStoreState } from "pullstate"
import { useQuery } from "react-query"
import { TogglService } from "../services/toggl/TogglService"
import { TogglStore, SettingsStore, SingleDayViewStore } from "../store"
import { TimeEntry } from "../types"
import { DaySelector } from "./DaySelector"
import { TimeEntryList } from "./TimeEntryList"

// FIXME write some tests
export function SingleDayTimeEntryList() {
  // FIXME add global error handling?
  const projects = useStoreState(TogglStore, (s) => s.projects)
  const token = useStoreState(SettingsStore, (s) => s.token)
  const day = useStoreState(SingleDayViewStore, (s) => s.day)

  // const { status, data, error } = useQuery<TimeEntry[], Error>(
  const { data } = useQuery<TimeEntry[], Error>(
    ["todaysTimeEntries", format(day, "yyyy-MM-dd")],
    async () => {
      return TogglService.getInstance(token).fetchTimeEntriesOfDay(day)
    },
    { enabled: projects.length > 0 && !!token, retry: 0 }
  )

  // FIXME wrap the table into a form, render start+end as inputs already
  return (
    <>
      <DaySelector />
      <TimeEntryList entries={data} />
    </>
  )
}
