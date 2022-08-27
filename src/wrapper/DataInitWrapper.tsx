import { Button } from "antd"
import { useStoreState } from "pullstate"
import { ReactNode } from "react"
import { useQuery } from "react-query"
import { useLocation } from "wouter"
import { TogglAPIError } from "../layout/Error"
import { SkeletonLoading } from "../layout/SkeletonLoading"
import { TogglService } from "../services/toggl/TogglService"
import { SettingsStore } from "../store"
import { Client, Project, TimeEntry, User } from "../types"

interface DataInitWrapperProps {
  content: ReactNode
}

export function DataInitWrapper({ content }: DataInitWrapperProps) {
  const [, setLocation] = useLocation()
  const token = useStoreState(SettingsStore, (s) => s.token)

  const { status: statusUser, data: user } = useQuery<User, Error>(["user"], async () => TogglService.getInstance(token).fetchUser(), {
    initialDataUpdatedAt: +new Date(),
    staleTime: 5 * 60 * 1000,
    retry: 0,
    enabled: !!token,
  })

  const { status: statusClients, data: clients } = useQuery<Client[], Error>(["clients"], async () => TogglService.getInstance(token).fetchClients(user!!.defaultWorkspaceId), {
    initialDataUpdatedAt: +new Date(),
    staleTime: 5 * 60 * 1000,
    retry: 0,
    enabled: !!token && !!user,
  })

  const { status: statusProjects, data: projects } = useQuery<Project[], Error>(
    ["projects"],
    async () => TogglService.getInstance(token).fetchProjects(user!!.defaultWorkspaceId),
    {
      initialDataUpdatedAt: +new Date(),
      staleTime: 5 * 60 * 1000,
      retry: 0,
      enabled: !!token && !!user && !!clients,
    }
  )

  const { status: statusCurrentTimeEntry } = useQuery<TimeEntry | null, Error>(["time_entry_current"], async () => TogglService.getInstance(token).fetchActiveTimeEntry(), {
    initialDataUpdatedAt: +new Date(),
    staleTime: 5 * 1000,
    retry: 0,
    enabled: !!token && !!user && !!clients && !!projects,
  })

  const errorDisplay = (
    <TogglAPIError
      extra={
        <Button type="primary" data-testid="datainitwrapper-error-link-settings" onClick={() => setLocation("/settings")}>
          Go to settings
        </Button>
      }
    />
  )

  const isLoading = statusUser === "loading" || statusClients === "loading" || statusProjects === "loading" || statusCurrentTimeEntry === "loading"
  const isError = statusUser === "error" || statusClients === "error" || statusProjects === "error" || statusCurrentTimeEntry === "error"

  return <>{isLoading ? <SkeletonLoading /> : isError ? errorDisplay : content}</>
}
