import { Select } from "antd"
import { useStoreState } from "pullstate"
import { useEffect, useState } from "react"
import { TimeBookingStore, TogglStore } from "../../store"

const { Option } = Select

interface ProjectSelectorInterface {
  tabIndex: number
  width: number
}

export function ProjectSelector({ tabIndex, width }: ProjectSelectorInterface) {
  const [isDisabled, setIsDisabled] = useState(false)
  const projects = useStoreState(TogglStore, (s) => s.projects)
  const selectedProject = useStoreState(TimeBookingStore, (s) => s.projectId)
  const timeEntry = useStoreState(TimeBookingStore, (s) => s.entry)

  useEffect(() => {
    setIsDisabled(timeEntry !== undefined)
  }, [timeEntry])

  function onSelect(projectId: number) {
    TimeBookingStore.update((s) => {
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
