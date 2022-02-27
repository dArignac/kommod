import React from "react"
import { Route, Switch } from "wouter"
import { MainScreen } from "./MainScreen"
import { globalStyles } from "./themes"

export function App() {
  globalStyles()
  return (
    <Switch>
      <Route>
        <MainScreen />
      </Route>
      <Route path="/settings">TODO Settings</Route>
    </Switch>
  )
}
