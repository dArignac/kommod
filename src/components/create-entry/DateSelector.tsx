import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns"
import { useStoreState } from "pullstate"
import { BookingStore } from "../../store"
import generatePicker from "antd/lib/date-picker/generatePicker"
import { Button } from "antd"
import { useState } from "react"
import { CalendarOutlined } from "@ant-design/icons"

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig)

interface DateSelectorProps {
  tabIndex: number
}

export function DateSelector({ tabIndex }: DateSelectorProps) {
  const day = useStoreState(BookingStore, (s) => s.day)
  const [open, setOpen] = useState(false)

  function onChangeDate(date: any, dateString: string) {
    BookingStore.update((s) => {
      s.day = date
    })
  }

  return (
    <div>
      <DatePicker
        tabIndex={1000}
        open={open}
        onChange={onChangeDate}
        onOpenChange={(open) => setOpen(open)}
        style={{ border: 0, borderRadius: 0, padding: 0, width: 0, visibility: "hidden" }}
        format={"DD.MM.YYYY"}
        value={day}
      />
      <Button tabIndex={tabIndex} icon={<CalendarOutlined />} onClick={() => setOpen(!open)} />
    </div>
  )
}
