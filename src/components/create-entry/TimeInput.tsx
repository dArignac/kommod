import { Input } from "antd"
import { useStoreState } from "pullstate"
import { ChangeEvent, useState } from "react"
import { parseTime } from "../../services/date"
import { BookingStore, BookingStoreTimes } from "../../store"

interface TimeInputProps {
  placeholder?: string
  storeAttribute: keyof BookingStoreTimes
  tabIndex: number
  validateOnEmpty: boolean
  width: number
}

export function TimeInput({ placeholder, storeAttribute, tabIndex, validateOnEmpty, width }: TimeInputProps) {
  const timeValue = useStoreState(BookingStore, (s) => s[storeAttribute])
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
      if (value.trim().length === 0 && !validateOnEmpty) {
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
      data-testid={`time-input-${storeAttribute}`}
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
