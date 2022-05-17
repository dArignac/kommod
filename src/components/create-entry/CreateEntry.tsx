import { Button } from "antd"
import generatePicker from "antd/lib/date-picker/generatePicker"
import { useStoreState } from "pullstate"
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns"
import { BookingStore } from "../../store"
import "./CreateEntry.css"
import { ProjectSelector } from "./ProjectSelector"
import { TaskSelector } from "./TaskSelector"
import { TimeInput } from "./TimeInput"

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig)

// FIXME #38 implement and test
// FIXME adjust widths to tauri app width
export function CreateEntry() {
  const day = useStoreState(BookingStore, (s) => s.day)

  // button needs to check all required values and set them to error
  // move the inputs to separate components
  // add widths to props to be able to align them here

  return (
    <div className="create-entry">
      <TaskSelector tabIndex={1} />
      <ProjectSelector tabIndex={2} />
      <TimeInput storeAttribute="timeStart" tabIndex={3} width={60} placeholder="10:00" />
      <TimeInput storeAttribute="timeStop" tabIndex={4} width={60} placeholder="11:00" />
      <Button tabIndex={5} style={{ width: 100 }}>
        Start
      </Button>
      <DatePicker tabIndex={6} style={{ width: 120 }} format={"DD.MM.YYYY"} value={day} />
    </div>
  )
}
