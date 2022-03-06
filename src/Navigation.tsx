import { styled } from "@stitches/react"
import { Link } from "wouter"

const Wrapper = styled("div", {
  padding: 10,
  textAlign: "right",
})

export function Navigation() {
  return (
    <Wrapper>
      <Link data-testid="link-settings" href="/settings">
        Settings
      </Link>
    </Wrapper>
  )
}
