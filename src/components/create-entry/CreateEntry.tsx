import { ActionButton } from "./ActionButton"
import "./CreateEntry.css"
import { DateSelector } from "./DateSelector"
import { ProjectSelector } from "./ProjectSelector"
import { TaskSelector } from "./TaskSelector"
import { TimeInput } from "./TimeInput"

// FIXME #38 implement and test
// FIXME #38 ensure the scenarios mentioned below. Todo: 1, 2, 3, 4
/**
 * Component that orchestrates the time entry addition or editing.
 * There are several scenarios for starting or editing (not that the day value is always set but can be changes):
 *   1. task and project are set              -> button says "Start" -> new and active entry created with datetime.now()
 *   2. task, project and start are set       -> button says "Start" -> new and active entry created with start time
 *   3. task, project, start and end are set  -> button says "Add"   -> new, finished entry is created with start and end time
 *   4  if an entry is already active (probably even before the application is launched), its ID is stored in the BookingStore and the
 *      values are filled properly -> button says "Stop"
 * @returns component to create/edit a time entry
 */
export function CreateEntry() {
  return (
    <div className="create-entry">
      <TaskSelector width={500} tabIndex={1} />
      <ProjectSelector width={400} tabIndex={2} />
      <TimeInput storeAttribute="timeStart" validateOnEmpty={true} width={60} tabIndex={3} placeholder="10:00" />
      <TimeInput storeAttribute="timeStop" validateOnEmpty={false} width={60} tabIndex={4} placeholder="11:00" />
      <ActionButton width={100} tabIndex={5} />
      <DateSelector tabIndex={6} />
    </div>
  )
}
