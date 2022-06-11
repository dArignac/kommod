import { ActionButton } from "./ActionButton"
import "./CreateEntry.css"
import { DateSelector } from "./DateSelector"
import { ProjectSelector } from "./ProjectSelector"
import { TaskSelector } from "./TaskSelector"
import { TimeInput } from "./TimeInput"

// FIXME #38 implement and test
// FIXME #38 ensure the requirements
/**
 * Component that orchestrates the time entry addition or editing.
 * @returns component to create/edit a time entry
 */
export function CreateEntry() {
  return (
    <div className="create-entry">
      <TaskSelector width={500} tabIndex={1} />
      <ProjectSelector width={400} tabIndex={2} />
      <TimeInput storeAttribute="timeStart" validateOnEmpty={false} width={60} tabIndex={3} placeholder="10:00" />
      <TimeInput storeAttribute="timeStop" validateOnEmpty={false} width={60} tabIndex={4} />
      <ActionButton width={100} tabIndex={5} />
      <DateSelector tabIndex={6} />
    </div>
  )
}
