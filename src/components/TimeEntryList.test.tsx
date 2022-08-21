import { render, screen } from "@testing-library/react"
import { TimeEntry } from "../types"
import { TimeEntryList } from "./TimeEntryList"

// FIXME use the mocks.ts
const project = {
  client: {
    id: 1,
    name: "client a",
  },
  color: "#ff0000",
  id: 1,
  name: "project a",
}

test("Renders without entries", () => {
  const data: TimeEntry[] = []
  render(<TimeEntryList entries={data} />)
  expect(screen.getByText("No Data")).toBeVisible()
})

// FIXME enable
// test("Renders with entries", () => {
//   const data: TimeEntry[] = [
//     {
//       description: "task a",
//       duration: 120 * 60,
//       id: 1,
//       project,
//       start: new Date("2022-05-06T14:00:00Z"),
//       stop: new Date("2022-05-06T16:00:00Z"),
//     },
//     {
//       description: "task b",
//       duration: 15 * 60,
//       id: 2,
//       project,
//       start: new Date("2022-05-06T16:30:00Z"),
//       stop: new Date("2022-05-06T16:45:00Z"),
//     },
//   ]
//   render(<TimeEntryList entries={data} />)

//   expect(screen.getByText("task a")).toBeVisible()
//   expect(screen.getByText("task b")).toBeVisible()
//   expect(screen.getAllByText("project a | client a").length).toBe(2)
//   screen.getAllByText("project a | client a").forEach((elem) => expect(elem).toBeVisible())
//   expect(screen.getAllByDisplayValue("14:00")[0]).toBeVisible()
//   expect(screen.getAllByDisplayValue("16:00")[0]).toBeVisible()
//   expect(screen.getAllByDisplayValue("16:30")[0]).toBeVisible()
//   expect(screen.getAllByDisplayValue("16:45")[0]).toBeVisible()
//   expect(screen.getByText("02:00:00")).toBeVisible()
//   expect(screen.getByText("00:15:00")).toBeVisible()
// })

// FIXME enable
// test("renders active entries correctly", () => {
//   const data: TimeEntry[] = [
//     {
//       description: "task a",
//       duration: 120 * 60,
//       id: 1,
//       project,
//       start: new Date("2022-05-06T14:00:00Z"),
//     },
//   ]
//   render(<TimeEntryList entries={data} />)
//   expect(screen.queryByText("02:00:00")).toBeNull()
// })
