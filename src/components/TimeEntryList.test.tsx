import { render, screen } from "@testing-library/react"
import { mockTimeEntry1, mockTimeEntry2 } from "../tests/mocks"
import { TimeEntry } from "../types"
import { TimeEntryList } from "./TimeEntryList"

test("Renders without entries", () => {
  const data: TimeEntry[] = []
  render(<TimeEntryList entries={data} />)
  expect(screen.getByText("No Data")).toBeVisible()
})

test("Renders with entries", () => {
  const data: TimeEntry[] = [mockTimeEntry1, mockTimeEntry2]
  render(<TimeEntryList entries={data} />)

  expect(screen.getByText(mockTimeEntry1.description)).toBeVisible()
  expect(screen.getByText(mockTimeEntry2.description)).toBeVisible()
  expect(screen.getAllByText("Project 1 | Client 1").length).toBe(2)
  screen.getAllByText("Project 1 | Client 1").forEach((elem) => expect(elem).toBeVisible())
  expect(screen.getAllByDisplayValue("11:00")[0]).toBeVisible()
  expect(screen.getAllByDisplayValue("15:00")[0]).toBeVisible()
  expect(screen.getAllByDisplayValue("23:00")[0]).toBeVisible()
  expect(screen.getAllByDisplayValue("00:00")[0]).toBeVisible()
  expect(screen.getByText("04:00:00")).toBeVisible()
  expect(screen.getByText("01:00:00")).toBeVisible()
})
