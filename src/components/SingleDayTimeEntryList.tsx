import { Button } from "antd"
import format from "date-fns/format"
import { useStoreState } from "pullstate"
import { useQuery } from "react-query"
import { useLocation } from "wouter"
import { Error } from "../layout/Error"
import { SkeletonLoading } from "../layout/SkeletonLoading"
import { TogglService } from "../services/toggl/TogglService"
import { ProjectStore, SettingsStore, SingleDayViewStore } from "../store"
import { TimeEntry } from "../types"
import { DaySelector } from "./DaySelector"
import { TimeEntryList } from "./TimeEntryList"

// FIXME write some tests
export function SingleDayTimeEntryList() {
  const [, setLocation] = useLocation()
  const projects = useStoreState(ProjectStore)
  const token = useStoreState(SettingsStore, (s) => s.token)
  const day = useStoreState(SingleDayViewStore, (s) => s.day)

  const errorDisplay = (
    <Error
      status="warning"
      title="Unable to fetch user data from toggl."
      subTitle="Please ensure the toggl.com API token is set in settings!"
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
    { enabled: projects.projects.length > 0 && !!token, retry: 0 }
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
          <TimeEntryList entries={data} />
        </>
      )}
    </>
  )
}
