import { ReactNode } from "react"
import { useQuery } from "react-query"
import { ServiceFactory } from "../services/ServiceFactory"

interface MainScreenWrapperProps {
  content: ReactNode
}

export function DataInitWrapper({ content }: MainScreenWrapperProps) {
  const { status, error } = useQuery<any, Error>(
    ["user"],
    async () => {
      return ServiceFactory.getInstance().getTogglService().fetchUser()
    },
    { retry: 0 }
  )
  // FIXME show loading indicator, use config.development.networkDelays.fetchUser
  return <>{status === "loading" ? <>loading...</> : status === "error" ? <>error!</> : content}</>
}
