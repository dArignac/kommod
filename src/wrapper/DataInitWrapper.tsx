import { Button } from "antd"
import { useStoreState } from "pullstate"
import { ReactNode } from "react"
import { useQuery } from "react-query"
import { useLocation } from "wouter"
import { Error, TogglAPIError } from "../layout/Error"
import { SkeletonLoading } from "../layout/SkeletonLoading"
import { TogglService } from "../services/toggl/TogglService"
import { SettingsStore } from "../store"
import { User } from "../types"

interface DataInitWrapperProps {
  content: ReactNode
}

export function DataInitWrapper({ content }: DataInitWrapperProps) {
  const [, setLocation] = useLocation()
  const token = useStoreState(SettingsStore, (s) => s.token)

  const { status } = useQuery<User, Error>(
    ["user"],
    async () => {
      return TogglService.getInstance(token).fetchUser()
    },
    { initialDataUpdatedAt: +new Date(), staleTime: 5 * 60 * 1000, retry: 0, enabled: !!token }
  )

  const errorDisplay = (
    <TogglAPIError
      extra={
        <Button type="primary" data-testid="datainitwrapper-error-link-settings" onClick={() => setLocation("/settings")}>
          Go to settings
        </Button>
      }
    />
  )

  const loadingDisplay = <SkeletonLoading />

  return <>{status === "loading" ? loadingDisplay : status === "error" ? errorDisplay : content}</>
}
