import { Layout } from "antd"
import React from "react"
import { Route, Switch } from "wouter"
import "./App.css"
import { Footer } from "./Footer"
import { Header } from "./Header"

const { Content } = Layout

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
          </Content>
          <Footer />
        </Layout>
      </Route>
    </Switch>
  )
}
