import { useStoreState } from "pullstate"
import React, { useEffect } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Route, Switch } from "wouter"
import "./App.css"
import { Settings } from "./components/Settings"
import { SingleDayTimeEntryList } from "./components/SingleDayTimeEntryList"
import { config } from "./config"
import { BaseLayout } from "./layout/BaseLayout"
import { SkeletonLoading } from "./layout/SkeletonLoading"
import { ServiceFactory } from "./services/ServiceFactory"
import { SettingsStore } from "./store"
import { DataInitWrapper } from "./wrapper/DataInitWrapper"

const storage = ServiceFactory.getInstance().getStorage()
const queryClient = new QueryClient()
storage.initialize()

export function App() {
  const isStorageReady = useStoreState(SettingsStore, (s) => s.isStorageReady)

  // useEffect(() => {
  //   async function setupStorage() {
  //     console.log("app")
  //     await storage.initialize()
  //   }
  //   setupStorage()
  // }, [])

  if (!isStorageReady) {
    return <SkeletonLoading />
  }

  return (
    <Switch>
      <Route path="/">
        <QueryClientProvider client={queryClient}>
          <BaseLayout content={<DataInitWrapper content={<SingleDayTimeEntryList />} />} />
          {config.development.reactQueryDevTools ? <ReactQueryDevtools initialIsOpen={false} /> : <></>}
        </QueryClientProvider>
      </Route>
      <Route path="/settings">
        <BaseLayout content={<Settings />} />
      </Route>
    </Switch>
  )
}
