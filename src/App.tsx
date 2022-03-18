import { Layout } from "antd"
import React from "react"
import { Route, Switch } from "wouter"
import "./App.css"
import { Settings } from "./components/Settings"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { TogglService } from "./services/toggl/TogglService"

const { Content } = Layout

// FIXME refactor the layout components that are duplicated here
export function App() {
  // FIXME move to appropriate component
  const toggl = TogglService.getInstance()
  console.log(toggl.getTimeEntries())

  return (
    <Switch>
      <Route path="/">
        <Layout>
          <Content>
            <Header />
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
