import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import { Button, Space } from "antd"
import generatePicker from "antd/lib/date-picker/generatePicker"
import addDays from "date-fns/addDays"
import subDays from "date-fns/subDays"
import { useStoreState } from "pullstate"
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns"
import { SingleDayViewStore } from "../store"

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig)

export function DaySelector() {
  const day = useStoreState(SingleDayViewStore, (s) => s.day)

  function goToPreviousDay() {
    SingleDayViewStore.update((s) => {
      s.day = subDays(day, 1)
    })
  }
  function onChangeDate(date: any, dateString: string) {
    SingleDayViewStore.update((s) => {
      s.day = date
    })
  }
  function goToNextDay() {
    SingleDayViewStore.update((s) => {
      s.day = addDays(day, 1)
    })
  }

  return (
    <div className="day-selector">
      <Space>
        <Button data-testid="day-select-previous" onClick={goToPreviousDay}>
          <LeftOutlined />
        </Button>
        <DatePicker data-testid="date-picker" value={day} format={"DD.MM.YYYY"} onChange={onChangeDate} />
        <Button data-testid="day-select-next" onClick={goToNextDay}>
          <RightOutlined />
        </Button>
      </Space>
    </div>
  )
}
