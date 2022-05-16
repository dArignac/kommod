import { Button, Input } from "antd"
import generatePicker from "antd/lib/date-picker/generatePicker"
import "./CreateEntry.css"
import { ProjectSelector } from "./ProjectSelector"
import { TaskSelector } from "./TaskSelector"
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns"
import { useStoreState } from "pullstate"
import { TogglStore } from "../store"

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig)

// FIXME #38 implement and test
// FIXME adjust widths to tauri app width
export function CreateEntry() {
  const day = useStoreState(TogglStore, (s) => s.booking.day)

  return (
    <div className="create-entry">
      <TaskSelector tabIndex={1} />
      <ProjectSelector tabIndex={2} />
      <Input style={{ width: 60 }} placeholder="10:00" tabIndex={3} />
      <Input style={{ width: 60 }} placeholder="11:00" tabIndex={4} />
      <Button style={{ width: 100 }} tabIndex={5}>
        Start
      </Button>
      <DatePicker style={{ width: 120 }} format={"DD.MM.YYYY"} value={day} tabIndex={6} />
    </div>
  )
}
