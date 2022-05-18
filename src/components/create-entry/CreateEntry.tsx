import { ActionButton } from "./ActionButton"
import "./CreateEntry.css"
import { DateSelector } from "./DateSelector"
import { ProjectSelector } from "./ProjectSelector"
import { TaskSelector } from "./TaskSelector"
import { TimeInput } from "./TimeInput"

// FIXME #38 implement and test
// FIXME adjust widths to tauri app width
// FIXME #38 get the current active time entry and prefill
export function CreateEntry() {
  return (
    <div className="create-entry">
      <TaskSelector width={500} tabIndex={1} />
      <ProjectSelector width={400} tabIndex={2} />
      <TimeInput storeAttribute="timeStart" width={60} tabIndex={3} placeholder="10:00" />
      <TimeInput storeAttribute="timeStop" width={60} tabIndex={4} placeholder="11:00" />
      <ActionButton width={100} tabIndex={5} />
      <DateSelector width={120} tabIndex={6} />
    </div>
  )
}
