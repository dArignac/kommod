import { ProjectSelector } from "./ProjectSelector"
import { TaskSelector } from "./TaskSelector"

// FIXME #38 implement and test
export function CreateEntry() {
  return (
    <div className="create-entry">
      <TaskSelector tabIndex={1} />
      <ProjectSelector tabIndex={2} />
    </div>
  )
}
