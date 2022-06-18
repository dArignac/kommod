import { Input } from "antd"
import { useStoreState } from "pullstate"
import { ChangeEvent, useState } from "react"
import { parseTime } from "../../services/date"
import { BookingStore } from "../../store"

interface TimeInputProps {
  placeholder?: string
  tabIndex: number
  width: number
}

export function StartTimeInput({ placeholder, tabIndex, width }: TimeInputProps) {
  const timeValue = useStoreState(BookingStore, (s) => s.timeStart)
  const [value, setValue] = useState("")
  const [status, setStatus] = useState<"" | "warning" | "error">("")

  function onBlur() {
    const time = parseTime(value)
    if (time !== null) {
      BookingStore.update((s) => {
        s.timeStart = time
      })
      setValue(time)
      setStatus("")
    } else {
      if (value.trim().length === 0) {
        setStatus("")
      } else {
        setStatus("error")
      }
    }
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  return (
    <Input
      data-testid={`time-input-start`}
      maxLength={5}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder || ""}
      status={status}
      style={{ width }}
      tabIndex={tabIndex}
      value={value || timeValue}
    />
  )
}
