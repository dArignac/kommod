import { Select } from "antd"
import { useStoreState } from "pullstate"
import { useEffect, useState } from "react"
import { BookingStore, TogglStore } from "../../store"

const { Option } = Select

interface ProjectSelectorInterface {
  tabIndex: number
  width: number
}

export function ProjectSelector({ tabIndex, width }: ProjectSelectorInterface) {
  const [isDisabled, setIsDisabled] = useState(false)
  const projects = useStoreState(TogglStore, (s) => s.projects)
  const selectedProject = useStoreState(BookingStore, (s) => s.projectId)
  const timeEntryId = useStoreState(BookingStore, (s) => s.timeEntryId)

  useEffect(() => {
    setIsDisabled(timeEntryId !== undefined)
  }, [timeEntryId])

  function onSelect(projectId: number) {
    BookingStore.update((s) => {
      s.projectId = projectId
    })
  }

  return (
    <Select data-testid="project-selector" style={{ width }} disabled={isDisabled} tabIndex={tabIndex} onSelect={onSelect} value={selectedProject}>
      {projects.map(function (project, idx) {
        return (
          <Option key={idx} value={project.id}>
            {project.name} | {project.client.name}
          </Option>
        )
      })}
    </Select>
  )
}
