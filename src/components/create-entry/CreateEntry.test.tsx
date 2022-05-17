import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CreateEntry } from "./CreateEntry"

// FIXME #38 add tests
// FIXME test workflow
test("Tabbing through subcomponents is in correct order", () => {
  render(<CreateEntry />)
  const taskSelector = within(screen.getByTestId("task-selector")).getByRole("combobox")
  const projectSelector = within(screen.getByTestId("project-selector")).getByRole("combobox")

  userEvent.tab()
  expect(taskSelector).toHaveFocus()
  userEvent.tab()
  expect(projectSelector).toHaveFocus()
})
