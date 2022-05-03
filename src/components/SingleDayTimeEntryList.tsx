import { Input, Table, Tag } from "antd"
import { useStoreState } from "pullstate"
import { useQuery } from "react-query"
import { formatDuration, formatTime } from "../services/date"
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

  function renderProject(record: TimeEntry) {
    return (
      <Tag color={record.project.color}>
        {record.project.name} | {record.project.client.name}
      </Tag>
    )
  }

  function renderStartStop(record: TimeEntry) {
    const stop = record.stop === null ? "" : formatTime(record.stop)
    return (
      <div className="wrap-start-end">
        <Input defaultValue={formatTime(record.start)} />
        <Input defaultValue={stop} />
      </div>
    )
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
        <Column title="Description" dataIndex="description" key="description" width="42%" />
        <Column title="Project/Client" key="project" render={renderProject} width="30%" />
        <Column title="Start/Stop" key="startstop" render={renderStartStop} width="12%" />
        <Column title="Sum" key="sum" render={renderSum} width="8%" />
        <Column title="Actions" key="actions" render={renderActions} width="8%" />
      </Table>
    </>
  )
}
