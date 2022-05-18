import { render } from "@testing-library/react"
import { ActionButton } from "./ActionButton"

test("renders the component", () => {
  render(<ActionButton tabIndex={1} width={100} />)
})
