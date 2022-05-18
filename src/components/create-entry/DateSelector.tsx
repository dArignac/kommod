import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns"
import { useStoreState } from "pullstate"
import { BookingStore } from "../../store"
import generatePicker from "antd/lib/date-picker/generatePicker"

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig)

interface DateSelectorProps {
  tabIndex: number
  width: number
}

export function DateSelector({ tabIndex, width }: DateSelectorProps) {
  const day = useStoreState(BookingStore, (s) => s.day)
  return <DatePicker tabIndex={tabIndex} style={{ width }} format={"DD.MM.YYYY"} value={day} />
}
