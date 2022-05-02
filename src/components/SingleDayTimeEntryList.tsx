import { Table } from "antd"
import { useStoreState } from "pullstate"
import { useQuery } from "react-query"
import { formatDuration } from "../services/date"
import { TogglService } from "../services/toggl/TogglService"
import { ProjectStore, SettingsStore, SingleDayViewStore } from "../store"
import { TimeEntry } from "../types"
import { DaySelector } from "./DaySelector"

const { Column } = Table

// FIXME write some tests
export function SingleDayTimeEntryList() {
  // FIXME add global error handling?
  const projects = useStoreState(ProjectStore)
  const token = useStoreState(SettingsStore, (s) => s.token)
  const day = useStoreState(SingleDayViewStore, (s) => s.day)

  // const { status, data, error } = useQuery<TimeEntry[], Error>(
  const { data } = useQuery<TimeEntry[], Error>(
    ["todaysTimeEntries", day],
    async () => {
      return TogglService.getInstance(token).fetchTimeEntriesOfDay(day)
    },
    { enabled: projects.projects.length > 0 && !!token, retry: 0 }
  )

  // FIXME could be done with a antd tag
  function renderProject(record: TimeEntry) {
    return (
      <>
        {record.project.name} | <i>{record.project.client.name}</i>
      </>
    )
  }

  function renderStartStop() {
    return <>Start/Stop</>
  }

  function renderSum(record: TimeEntry) {
    return <>{formatDuration(record.duration)}</>
  }

  function renderActions() {
    return <>Actions</>
  }

  // FIXME wrap the table into a form, render start+end as inputs already
  return (
    <>
      <DaySelector />
      <Table dataSource={data} rowKey="id" showHeader={false} pagination={false}>
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Project/Client" key="project" render={renderProject} />
        <Column title="Start/Stop" key="startstop" render={renderStartStop} />
        <Column title="Sum" key="sum" render={renderSum} />
        <Column title="Actions" key="actions" render={renderActions} />
      </Table>
    </>
  )
}
