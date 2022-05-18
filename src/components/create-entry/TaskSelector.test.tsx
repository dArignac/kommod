import { render } from "@testing-library/react"
import { TaskSelector } from "./TaskSelector"

test("renders the component", () => {
  render(<TaskSelector tabIndex={1} width={200} />)
})
