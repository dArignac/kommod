import { styled } from "@stitches/react"
import { theme } from "./themes"

const FooterGrid = styled("div", {
  alignItems: "center",
  backgroundColor: theme.colors.backgroundLight,
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr",
  justifyContent: "center",
  justifyItems: "center",
})

export function Footer() {
  return (
    <FooterGrid>
      <div>
        El Toggl - <a href="https://github.com/darignac/el-toggl">Github</a>
      </div>
    </FooterGrid>
  )
}
