import { Table } from "antd"
import { useStoreState } from "pullstate"
import { useQuery } from "react-query"
import { formatDuration } from "../services/date"
import { ServiceFactory } from "../services/ServiceFactory"
import { ProjectStore } from "../store"
import { TimeEntry } from "../types"

const { Column } = Table

// FIXME write some tests
export function SingleDayTimeEntryList() {
  // FIXME add global error handling?
  const projects = useStoreState(ProjectStore)

  // const { status, data, error } = useQuery<TimeEntry[], Error>(
  const { data } = useQuery<TimeEntry[], Error>(
    ["todaysTimeEntries"],
    async () => {
      return ServiceFactory.getInstance().getTogglService().fetchTimeEntriesOfToday()
    },
    { enabled: projects.projects.length > 0, retry: 0 }
  )

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

  // FIXME show day with selection (prev day, next day)
  // FIXME wrap the table into a form, render start+end as inputs already
  return (
    <Table dataSource={data} rowKey="id" showHeader={false} pagination={false}>
      <Column title="Description" dataIndex="description" key="description" />
      <Column title="Project/Client" key="project" render={renderProject} />
      <Column title="Start/Stop" key="startstop" render={renderStartStop} />
      <Column title="Sum" key="sum" render={renderSum} />
      <Column title="Actions" key="actions" render={renderActions} />
    </Table>
  )
}
