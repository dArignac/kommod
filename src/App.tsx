import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Route, Switch } from "wouter"
import "./App.css"
import { Settings } from "./components/Settings"
import { TimeEntryList } from "./components/TimeEntryList"
import { BaseLayout } from "./layout/BaseLayout"

const queryClient = new QueryClient()

export function App() {
  return (
    <Switch>
      <Route path="/">
        <BaseLayout
          content={
            <QueryClientProvider client={queryClient}>
              <TimeEntryList />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          }
        />
      </Route>
      <Route path="/settings">
        <BaseLayout content={<Settings />} />
      </Route>
    </Switch>
  )
}
