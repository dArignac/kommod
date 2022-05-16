import { Input, Table, Tag } from "antd"
import { formatDuration, formatTime } from "../services/date"
import { TimeEntry } from "../types"
import "./TimeEntryList.css"

const { Column } = Table

interface TimeEntryListProps {
  entries: TimeEntry[] | undefined
}

function renderDescription(record: TimeEntry) {
  return <>{record.description}</>
}

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
  if ("stop" in record) return <>{formatDuration(record.duration)}</>
  return ""
}

function renderActions() {
  return <>Actions</>
}

export function TimeEntryList({ entries }: TimeEntryListProps) {
  return (
    <Table dataSource={entries} rowKey="id" showHeader={false} pagination={false}>
      <Column title="Description" key="description" render={renderDescription} width="42%" />
      <Column title="Project/Client" key="project" render={renderProject} width="30%" />
      <Column title="Start/Stop" key="startstop" render={renderStartStop} width="12%" />
      <Column title="Sum" key="sum" render={renderSum} width="8%" />
      <Column title="Actions" key="actions" render={renderActions} width="8%" />
    </Table>
  )
}
