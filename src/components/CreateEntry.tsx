import { AutoComplete, Button, Col, Row } from "antd"
import { useStoreState } from "pullstate"
import { useEffect, useState } from "react"
import { TogglStore } from "../store"

const mockVal = (str: string, repeat: number = 1) => ({
  value: str.repeat(repeat),
})

// FIXME #38 implement and test
export function CreateEntry() {
  const [options, setOptions] = useState<{ value: string }[]>([])
  const tasks = useStoreState(TogglStore, (s) => s.tasks)
  const sortedTasks = Array.from(new Set(tasks)).sort()
  let taskOptions = sortedTasks.map((task) => {
    return { value: task }
  })
  const onSearch = (searchText: string) => {
    // FIXME remove
    console.log("onSearch", searchText)
    setOptions([...taskOptions].filter((option) => option.value.toLowerCase().includes(searchText.toLowerCase())))
  }
  const onSelect = (data: string) => {
    // FIXME remove
    console.log("onSelect", data)
  }
  const onChange = (data: string) => {
    // FIXME remove
    // setValue(data)
    console.log("onChange", data)
  }
  const onClick = () => {
    // FIXME remove
    TogglStore.update((s) => {
      s.tasks = [...s.tasks, "XXX"]
    })
  }
  const onFocus = () => {
    // FIXME remove
    console.log("onFocus")
    setOptions(taskOptions)
  }

  return (
    <Row>
      <Col span={24} offset={0}>
        <Button onClick={onClick}>Test</Button>
        <AutoComplete options={options} style={{ width: 400 }} onSelect={onSelect} onSearch={onSearch} onFocus={onFocus} />
      </Col>
    </Row>
  )
}
