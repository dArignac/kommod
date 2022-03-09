import { Layout, PageHeader } from "antd"
import React from "react"
import { Route, Switch } from "wouter"
import "./App.css"
import { Footer } from "./Footer"
import { Navigation } from "./Navigation"

const { Content } = Layout

export function App() {
  return (
    <Switch>
      <Route path="/">
        <Layout>
          <Content>
            <PageHeader className="site-page-header" title="El Toggl" extra={[<Navigation key="nav" />]} />
          </Content>
          <Footer />
        </Layout>
      </Route>
      <Route path="/settings">TODO Settings</Route>
    </Switch>
  )
}
