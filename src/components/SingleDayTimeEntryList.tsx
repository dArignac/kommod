import { Table } from "antd"
import { useStoreState } from "pullstate"
import { useQuery } from "react-query"
import { ServiceFactory } from "../services/ServiceFactory"
import { ProjectStore } from "../store"
import { TimeEntry } from "../types"

const { Column } = Table

export function SingleDayTimeEntryList() {
  // FIXME add global error handling?
  const projects = useStoreState(ProjectStore)

  const { status, data, error } = useQuery<TimeEntry[], Error>(
    ["todaysTimeEntries"],
    async () => {
      return ServiceFactory.getInstance().getTogglService().fetchTimeEntriesOfToday()
    },
    { enabled: projects.projects.length > 0, retry: 0 }
  )

  function renderProject(record: TimeEntry) {
    return <>{record.project.name}</>
  }

  // let data: TimeEntry[] = []

  // FIXME no project in data yet
  // FIXME hide head showHeader={false}
  // FIXME show day with selection (prev day, next day)
  // FIXME wrap the table into a form, render start+end as inputs already
  return (
    <Table dataSource={data} rowKey="id" showHeader={true} pagination={false}>
      <Column title="Description" dataIndex="description" key="description" />
      <Column title="Project/Client" key="project" render={renderProject} />
      <Column title="Start/Stop" key="startstop" />
      <Column title="Sum" key="sum" />
      <Column title="Actions" key="actions" />
    </Table>
  )
}
