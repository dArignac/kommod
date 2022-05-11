import { AutoComplete, Col, Row } from "antd"
import { useStoreState } from "pullstate"
import { TogglStore } from "../store"

// FIXME #38 implement and test
export function CreateEntry() {
  const tasks = useStoreState(TogglStore, (s) => s.tasks)
  const sortedTasks = Array.from(new Set(tasks)).sort()
  let taskOptions = sortedTasks.map((task) => {
    return { label: task }
  })
  return (
    <Row>
      <Col span={24} offset={0}>
        <AutoComplete style={{ width: 400 }} options={taskOptions} />
      </Col>
    </Row>
  )
}
