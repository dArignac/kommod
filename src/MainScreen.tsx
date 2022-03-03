import { styled } from "@stitches/react"
import React from "react"
import { Footer } from "./Footer"
import { theme } from "./themes"

// FIXME align dimensions with tauri app window
const MainGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: theme.tauri.width.computedValue,
  gridTemplateRows: "70px 500px 30px",
})

const TopRow = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 100px",
})

const MainRow = styled("div", {})

export function MainScreen() {
  return (
    <MainGrid>
      <TopRow>
        <div>EntryCreator</div>
        <div>Settings</div>
      </TopRow>
      <MainRow>MainRow</MainRow>
      <Footer />
    </MainGrid>
  )
}
