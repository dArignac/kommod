import { render, screen } from "@testing-library/react"
import { SkeletonLoading } from "./SkeletonLoading"

test("It renders", () => {
  render(<SkeletonLoading />)
  expect(screen.getByTestId("skeleton-loading")).toBeInTheDocument()
})
