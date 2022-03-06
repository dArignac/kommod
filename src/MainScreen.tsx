import { styled } from "@stitches/react"
import React from "react"
import { Footer } from "./Footer"
import { Navigation } from "./Navigation"
import { theme } from "./themes"

const MainGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: theme.tauri.width.computedValue,
  gridTemplateRows: "70px 500px 30px",
})

const TopRow = styled("div", {
  backgroundColor: theme.colors.backgroundLight,
  display: "grid",
  gridTemplateColumns: "1fr 100px",
})

const MainRow = styled("div", {})

export function MainScreen() {
  return (
    <MainGrid>
      <TopRow>
        <div>EntryCreator</div>
        <Navigation />
      </TopRow>
      <MainRow>MainRow</MainRow>
      <Footer />
    </MainGrid>
  )
}
