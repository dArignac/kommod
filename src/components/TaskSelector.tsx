import { AutoComplete } from "antd"
import { useStoreState } from "pullstate"
import { useState } from "react"
import { TogglStore } from "../store"

interface TaskSelectorInterface {
  tabIndex: number
}

export function TaskSelector({ tabIndex }: TaskSelectorInterface) {
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
  const onFocus = () => {
    setOptions(taskOptions)
  }

  return <AutoComplete data-testid="task-selector" options={options} style={{ width: 500 }} onSelect={onSelect} onSearch={onSearch} onFocus={onFocus} tabIndex={tabIndex} />
}
