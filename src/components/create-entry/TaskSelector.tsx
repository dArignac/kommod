import { AutoComplete } from "antd"
import { useStoreState } from "pullstate"
import { useEffect, useState } from "react"
import { TimeBookingStore, TogglStore } from "../../store"

interface TaskSelectorInterface {
  tabIndex: number
  width: number
}

export function TaskSelector({ tabIndex, width }: TaskSelectorInterface) {
  const [options, setOptions] = useState<{ value: string }[]>([])
  const [isDisabled, setIsDisabled] = useState(false)
  const [value, setValue] = useState("")
  const tasks = useStoreState(TogglStore, (s) => s.tasks)
  const timeEntry = useStoreState(TimeBookingStore, (s) => s.entry)
  const timeEntryDescription = useStoreState(TimeBookingStore, (s) => s.description)

  useEffect(() => {
    const hasActiveEntry = timeEntry !== undefined
    setIsDisabled(hasActiveEntry)
    if (hasActiveEntry) {
      setValue(timeEntryDescription!!)
    }
    if (!hasActiveEntry && timeEntryDescription === undefined) {
      setValue("")
    }
  }, [timeEntry, timeEntryDescription])

  const sortedTasks = Array.from(new Set(tasks)).sort()
  let taskOptions = sortedTasks.map((task) => {
    return { value: task }
  })

  function onChange(text: string) {
    setValue(text)
  }

  function onBlur() {
    TimeBookingStore.update((s) => {
      s.description = value
    })
  }

  function onFocus() {
    setOptions(taskOptions)
  }

  return (
    <AutoComplete
      data-testid="task-selector"
      disabled={isDisabled}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      onSelect={onChange}
      options={options}
      style={{ width }}
      tabIndex={tabIndex}
      value={value}
    />
  )
}
