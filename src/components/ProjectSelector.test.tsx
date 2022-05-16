import { render } from "@testing-library/react"
import { ProjectSelector } from "./ProjectSelector"

test("Renders the component", () => {
  render(<ProjectSelector tabIndex={1} />)
})
