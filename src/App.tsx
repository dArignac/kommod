import { Layout } from "antd"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Route, Switch } from "wouter"
import "./App.css"
import { Settings } from "./components/Settings"
import { TimeEntryList } from "./components/TimeEntryList"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { ReactQueryDevtools } from "react-query/devtools"

const queryClient = new QueryClient()
const { Content } = Layout

// FIXME refactor the layout components that are duplicated here
export function App() {
  return (
    <Switch>
      <Route path="/">
        <Layout>
          <Content>
            <Header />
            <QueryClientProvider client={queryClient}>
              <TimeEntryList />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </Content>
          <Footer />
        </Layout>
      </Route>
      <Route path="/settings">
        <Layout>
          <Content>
            <Header />
            <Settings />
          </Content>
          <Footer />
        </Layout>
      </Route>
    </Switch>
  )
}
