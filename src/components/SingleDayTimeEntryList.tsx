import { Button } from "antd"
import format from "date-fns/format"
import { useStoreState } from "pullstate"
import { useQuery } from "react-query"
import { useLocation } from "wouter"
import { Error, TogglAPIError } from "../layout/Error"
import { SkeletonLoading } from "../layout/SkeletonLoading"
import { TogglService } from "../services/toggl/TogglService"
import { SettingsStore, SingleDayViewStore, TogglStore } from "../store"
import { TimeEntry } from "../types"
import { CreateEntry } from "./CreateEntry"
import { DaySelector } from "./DaySelector"
import { TimeEntryList } from "./TimeEntryList"

// FIXME write some tests
export function SingleDayTimeEntryList() {
  // FIXME add global error handling?
  const [, setLocation] = useLocation()
  const projects = useStoreState(TogglStore, (s) => s.projects)
  const token = useStoreState(SettingsStore, (s) => s.token)
  const day = useStoreState(SingleDayViewStore, (s) => s.day)

  const errorDisplay = (
    <TogglAPIError
      extra={
        <Button type="primary" data-testid="datainitwrapper-error-link-settings" onClick={() => setLocation("/settings")}>
          Go to settings
        </Button>
      }
    />
  )

  const { data, status } = useQuery<TimeEntry[], Error>(
    ["todaysTimeEntries", format(day, "yyyy-MM-dd")],
    async () => {
      return TogglService.getInstance(token).fetchTimeEntriesOfDay(day)
    },
    { enabled: projects.length > 0 && !!token, retry: 0 }
  )

  // FIXME wrap the table into a form, render start+end as inputs already
  return (
    <>
      {status === "loading" ? (
        <SkeletonLoading />
      ) : status === "error" ? (
        errorDisplay
      ) : (
        <>
          <DaySelector />
          <CreateEntry />
          <TimeEntryList entries={data} />
        </>
      )}
    </>
  )
}
