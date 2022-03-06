import { styled } from "@stitches/react"
import { ReactNode } from "react"
import { theme } from "../themes"

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

interface GridProps {
  topRowLeft: ReactNode
  topRowRight: ReactNode
  mainRow: ReactNode
  footerRow: ReactNode
}

export function Grid({ topRowLeft, topRowRight, mainRow, footerRow }: GridProps) {
  return (
    <MainGrid>
      <TopRow>
        <div>{topRowLeft}</div>
        <div>{topRowRight}</div>
      </TopRow>
      <MainRow>{mainRow}</MainRow>
      {footerRow}
    </MainGrid>
  )
}
