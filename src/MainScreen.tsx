import { styled } from "@stitches/react"
import React from "react"

// FIXME align dimensions with tauri app window
const MainGrid = styled("div", {
  display: "grid",
  gridTemplateRows: "60px 300px 30px",
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
      <div>Footer</div>
    </MainGrid>
  )
}
