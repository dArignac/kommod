import { render, screen } from "@testing-library/react"
import { Error, TogglAPIError } from "./Error"

test("Renders with required properties", () => {
  render(<Error status="error" title="The Title" />)
  expect(screen.getByText(/The Title/)).toBeInTheDocument()
})

test("renders with optional properties", () => {
  render(<Error status="error" title="The Title" subTitle="The Subtitle" extra={<>The Extra</>} />)
  expect(screen.getByText(/The Title/)).toBeInTheDocument()
  expect(screen.getByText(/The Subtitle/)).toBeInTheDocument()
  expect(screen.getByText(/The Extra/)).toBeInTheDocument()
})

test("renders toggl api error component", () => {
  render(<TogglAPIError extra={<>extra</>} />)
  expect(screen.getByText(/Unable to fetch user data from toggl./)).toBeInTheDocument()
  expect(screen.getByText(/Please ensure the toggl.com API token is set in settings!/)).toBeInTheDocument()
  expect(screen.getByText(/extra/)).toBeInTheDocument()
})
