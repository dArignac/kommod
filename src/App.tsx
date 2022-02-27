import { styled } from "@stitches/react"
import React from "react"
import { globalStyles } from "./themes"

const MainGrid = styled('div', {
  display: 'grid',
  gridTemplateRows: '100px 1fr'
})

const TopRow = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 100px'
})

const MainRow = styled('div', {})

function App() {
  globalStyles()
  return <MainGrid>
    <TopRow>
      <div>EntryCreator</div>
      <div>Settings</div>
    </TopRow>
    <MainRow>MainRow</MainRow>
  </MainGrid>
}

export default App
