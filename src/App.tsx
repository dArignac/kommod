import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Route, Switch } from "wouter"
import "./App.css"
import { Settings } from "./components/Settings"
import { SingleDayTimeEntryList } from "./components/SingleDayTimeEntryList"
import { config } from "./config"
import { BaseLayout } from "./layout/BaseLayout"
import { DataInitWrapper } from "./wrapper/DataInitWrapper"

const queryClient = new QueryClient()

export function App() {
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
