import { Button } from "antd"
import { ReactNode } from "react"
import { useQuery } from "react-query"
import { useLocation } from "wouter"
import { Error } from "../layout/Error"
import { SkeletonLoading } from "../layout/SkeletonLoading"
import { ServiceFactory } from "../services/ServiceFactory"

interface DataInitWrapperProps {
  content: ReactNode
}

export function DataInitWrapper({ content }: DataInitWrapperProps) {
  const [, setLocation] = useLocation()

  const { status } = useQuery<any, Error>(
    ["user"],
    async () => {
      return ServiceFactory.getInstance().getTogglService().fetchUser()
    },
    { initialDataUpdatedAt: +new Date(), staleTime: 5 * 60 * 1000, retry: 0 }
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
