import { Input } from "antd"
import { ChangeEvent, useState } from "react"
import { parseTime } from "../../services/date"
import { BookingStore, BookingStoreTimes } from "../../store"

interface TimeInputProps {
  placeholder: string
  storeAttribute: keyof BookingStoreTimes
  tabIndex: number
  width: number
}

export function TimeInput({ placeholder, storeAttribute, tabIndex, width }: TimeInputProps) {
  const [value, setValue] = useState("")
  const [status, setStatus] = useState<"" | "warning" | "error">("")

  function onBlur() {
    const time = parseTime(value)
    if (time !== null) {
      BookingStore.update((s) => {
        s[storeAttribute] = time
      })
      setValue(time)
      setStatus("")
    } else {
      setStatus("error")
    }
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  return (
    <Input
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      status={status}
      data-testid="create-entry-time-start"
      maxLength={5}
      tabIndex={tabIndex}
      style={{ width }}
      placeholder={placeholder}
    />
  )
}
