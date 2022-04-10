import { cleanup, render, screen } from "@testing-library/react"
import MatchMediaMock from "jest-matchmedia-mock"
import { SkeletonLoading } from "./SkeletonLoading"

let matchMedia: MatchMediaMock

beforeEach(cleanup)

beforeAll(() => {
  matchMedia = new MatchMediaMock()
})

afterEach(() => {
  matchMedia.clear()
})

test("It renders", () => {
  render(<SkeletonLoading />)
  expect(screen.getByTestId("skeleton-loading")).toBeInTheDocument()
})
