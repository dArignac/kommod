import { AutoComplete } from "antd"
import { useStoreState } from "pullstate"
import { useState } from "react"
import { BookingStore, TogglStore } from "../../store"

interface TaskSelectorInterface {
  tabIndex: number
  width: number
}

// FIXME #38 add the project and select it on selection (plus according changes on project selector)
// FIXME #38 value is not set if prefilled store on active entry
export function TaskSelector({ tabIndex, width }: TaskSelectorInterface) {
  const [options, setOptions] = useState<{ value: string }[]>([])
  const tasks = useStoreState(TogglStore, (s) => s.tasks)

  const sortedTasks = Array.from(new Set(tasks)).sort()
  let taskOptions = sortedTasks.map((task) => {
    return { value: task }
  })

  const onSearch = (searchText: string) => {
    setOptions([...taskOptions].filter((option) => option.value.toLowerCase().includes(searchText.toLowerCase())))
  }

  const onSelect = (taskDescription: string) => {
    BookingStore.update((s) => {
      s.timeEntryDescription = taskDescription
    })
  }

  const onFocus = () => {
    setOptions(taskOptions)
  }

  return <AutoComplete data-testid="task-selector" options={options} style={{ width }} onSelect={onSelect} onSearch={onSearch} onFocus={onFocus} tabIndex={tabIndex} />
}
