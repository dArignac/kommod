import { Table } from "antd"
import { useQuery } from "react-query"
import { ServiceFactory } from "../services/ServiceFactory"
import { TimeEntry } from "../types"

const { Column } = Table

export function SingleDayTimeEntryList() {
  // FIXME add global error handling?

  // FIXME enable
  // const { status, data, error } = useQuery<TimeEntry[], Error>(
  //   ["todaysTimeEntries"],
  //   async () => {
  //     return ServiceFactory.getInstance().getTogglService().fetchTimeEntriesOfToday()
  //   },
  //   { retry: 0 }
  // )

  // FIXME remove
  let data: TimeEntry[] = []

  // FIXME no project in data yet
  // FIXME hide head showHeader={false}
  // FIXME show day with selection (prev day, next day)
  // FIXME wrap the table into a form, render start+end as inputs already
  return (
    <Table dataSource={data} rowKey="id" showHeader={true} pagination={false}>
      <Column title="Description" dataIndex="description" key="description" />
      <Column title="Project" key="project" />
      <Column title="Start/Stop" key="startstop" />
      <Column title="Sum" key="sum" />
      <Column title="Actions" key="actions" />
    </Table>
  )
}
