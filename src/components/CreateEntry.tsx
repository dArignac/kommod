import { ProjectSelector } from "./ProjectSelector"
import { TaskSelector } from "./TaskSelector"

// FIXME #38 implement and test
export function CreateEntry() {
  return (
    <div className="create-entry">
      <TaskSelector />
      <ProjectSelector />
    </div>
  )
}
