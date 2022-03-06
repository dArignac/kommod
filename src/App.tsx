import React from "react"
import { Route, Switch } from "wouter"
import { Footer } from "./Footer"
import { Grid } from "./layout/Grid"
import { Navigation } from "./Navigation"
import { globalStyles } from "./themes"

export function App() {
  globalStyles()
  return (
    <Switch>
      <Route path="/">
        <Grid topRowLeft={<div>EntryCreator</div>} topRowRight={<Navigation />} mainRow={<>MainRow</>} footerRow={<Footer />} />
      </Route>
      <Route path="/settings">TODO Settings</Route>
    </Switch>
  )
}
