import { Button } from "antd"
import { useStoreState } from "pullstate"
import { ReactNode } from "react"
import { useQuery } from "react-query"
import { useLocation } from "wouter"
import { Error } from "../layout/Error"
import { SkeletonLoading } from "../layout/SkeletonLoading"
import { TogglService } from "../services/toggl/TogglService"
import { SettingsStore } from "../store"

interface DataInitWrapperProps {
  content: ReactNode
}

export function DataInitWrapper({ content }: DataInitWrapperProps) {
  const [, setLocation] = useLocation()
  const token = useStoreState(SettingsStore, (s) => s.token)

  const { status } = useQuery<any, Error>(
    ["user"],
    async () => {
      return TogglService.getInstance(token).fetchUser()
    },
    { initialDataUpdatedAt: +new Date(), staleTime: 5 * 60 * 1000, retry: 0, enabled: !!token }
  )

  const errorDisplay = (
    <Error
      status="warning"
      title="Unable to fetch user data from toggl."
      subTitle="Please ensure the toggl.com API token is set in settings!"
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
