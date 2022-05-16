import { Select } from "antd"
import { useStoreState } from "pullstate"
import { TogglStore } from "../store"

const { Option } = Select

interface ProjectSelectorInterface {
  tabIndex: number
}

// FIXME #38 implement
// FIXME make tabindex a prop
export function ProjectSelector({ tabIndex }: ProjectSelectorInterface) {
  const projects = useStoreState(TogglStore, (s) => s.projects)
  const selectedProject = useStoreState(TogglStore, (s) => s.booking.projectId)

  const onSelect = (projectId: number) => {
    TogglStore.update((s) => {
      s.booking.projectId = projectId
    })
  }

  return (
    <Select data-testid="project-selector" style={{ width: 400 }} tabIndex={tabIndex} onSelect={onSelect} value={selectedProject}>
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
