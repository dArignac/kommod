import { ReactNode } from "react"
import { useQuery } from "react-query"
import { ServiceFactory } from "../services/ServiceFactory"

interface DataInitWrapperProps {
  content: ReactNode
}

export function DataInitWrapper({ content }: DataInitWrapperProps) {
  const { status, error } = useQuery<any, Error>(
    ["user"],
    async () => {
      return ServiceFactory.getInstance().getTogglService().fetchUser()
    },
    { initialDataUpdatedAt: +new Date(), staleTime: 5 * 60 * 1000, retry: 0 }
  )
  // FIXME show loading indicator, use config.development.networkDelays.fetchUser
  return <>{status === "loading" ? <>loading...</> : status === "error" ? <>error!</> : content}</>
}
