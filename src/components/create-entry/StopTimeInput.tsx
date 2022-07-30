import { Input } from "antd"
import { isBefore } from "date-fns"
import { useStoreState } from "pullstate"
import { ChangeEvent, useState } from "react"
import { combineDateWithTime, parseTime } from "../../services/date"
import { TimeBookingStore } from "../../store"

interface TimeInputProps {
  placeholder?: string
  tabIndex: number
  width: number
}

export function StopTimeInput({ placeholder, tabIndex, width }: TimeInputProps) {
  const startTime = useStoreState(TimeBookingStore, (s) => s.start)
  const stopTime = useStoreState(TimeBookingStore, (s) => s.stop)
  const day = useStoreState(TimeBookingStore, (s) => s.day)
  const [value, setValue] = useState("")
  const [status, setStatus] = useState<"" | "warning" | "error">("")

  function onBlur() {
    const time = parseTime(value)
    if (time !== null) {
      TimeBookingStore.update((s) => {
        s.stop = time
      })
      setValue(time)

      // check if value is before the start date
      if (startTime !== undefined) {
        if (isBefore(combineDateWithTime(day, time), combineDateWithTime(day, startTime!!))) {
          setStatus("error")
        }
      } else {
        setStatus("")
      }
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
      data-testid={`time-input-stop`}
      maxLength={5}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder || ""}
      status={status}
      style={{ width }}
      tabIndex={tabIndex}
      value={stopTime}
    />
  )
}
