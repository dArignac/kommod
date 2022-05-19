import { render } from "@testing-library/react"
import { DateSelector } from "./DateSelector"

test("renders the component", () => {
  render(<DateSelector tabIndex={1} />)
})
