import { render } from "@testing-library/react"
import { getSkeletonLoading } from "../tests/selectors"
import { SkeletonLoading } from "./SkeletonLoading"

test("it renders", () => {
  render(<SkeletonLoading />)
  expect(getSkeletonLoading()).toBeInTheDocument()
})
