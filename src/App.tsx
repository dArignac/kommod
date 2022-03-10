import { Layout } from "antd"
import React from "react"
import { Route, Switch } from "wouter"
import "./App.css"
import { Settings } from "./components/Settings"
import { Footer } from "./Footer"
import { Header } from "./Header"

const { Content } = Layout

// FIXME refactor the layout components that are duplicated here
export function App() {
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
