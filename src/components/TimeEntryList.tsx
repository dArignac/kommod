import { Input, Table, Tag } from "antd"
import { formatDuration, formatTime } from "../services/date"
import { TimeEntry } from "../types"

const { Column } = Table

interface TimeEntryListProps {
  entries: TimeEntry[] | undefined
}

// FIXME add tests for #41
export function TimeEntryList({ entries }: TimeEntryListProps) {
  function renderProject(record: TimeEntry) {
    return (
      <Tag color={record.project.color}>
        {record.project.name} | {record.project.client.name}
      </Tag>
    )
  }

  function renderStartStop(record: TimeEntry) {
    const stop = "stop" in record ? formatTime(record.stop!) : ""
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

  return (
    <Table dataSource={entries} rowKey="id" showHeader={false} pagination={false}>
      <Column title="Description" dataIndex="description" key="description" width="42%" />
      <Column title="Project/Client" key="project" render={renderProject} width="30%" />
      <Column title="Start/Stop" key="startstop" render={renderStartStop} width="12%" />
      <Column title="Sum" key="sum" render={renderSum} width="8%" />
      <Column title="Actions" key="actions" render={renderActions} width="8%" />
    </Table>
  )
}
