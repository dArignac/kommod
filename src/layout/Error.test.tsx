import { cleanup, render, screen } from "@testing-library/react"
import MatchMediaMock from "jest-matchmedia-mock"
import { Error } from "./Error"

let matchMedia: MatchMediaMock

beforeEach(cleanup)

beforeAll(() => {
  matchMedia = new MatchMediaMock()
})

afterEach(() => {
  matchMedia.clear()
})

test("Renders with required properties", () => {
  render(<Error status="error" title="The Title" />)
  expect(screen.getByText(/The Title/)).toBeInTheDocument()
})

test("Renders with optional properties", () => {
  render(<Error status="error" title="The Title" subTitle="The Subtitle" extra={<>The Extra</>} />)
  expect(screen.getByText(/The Title/)).toBeInTheDocument()
  expect(screen.getByText(/The Subtitle/)).toBeInTheDocument()
  expect(screen.getByText(/The Extra/)).toBeInTheDocument()
})
