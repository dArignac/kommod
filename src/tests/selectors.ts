import { screen, within } from "@testing-library/react"

export function getActionButton(): HTMLButtonElement {
  return screen.getByTestId("action-button")
}

export function getDatePicker(): HTMLInputElement {
  return screen.getByTestId("date-picker")
}

export function getDaySelectorNext(): HTMLButtonElement {
  return screen.getByTestId("day-select-next")
}

export function getDaySelectorPrevious(): HTMLButtonElement {
  return screen.getByTestId("day-select-previous")
}

export function getHomeLink() {
  return screen.getByTestId("link-home")
}

export function getSettingsLink() {
  return screen.getByTestId("link-settings")
}

export function getSettingsSubmitButton(): HTMLButtonElement {
  return screen.getByTestId("submit")
}

export function getSettingsTokenInput(): HTMLInputElement {
  return screen.getByTestId("token")
}

export function getSkeletonLoading() {
  return screen.getByTestId("skeleton-loading")
}

export function getStartTimeInput() {
  return screen.getByTestId("time-input-start")
}

export function getStopTimeInput() {
  return screen.getByTestId("time-input-stop")
}

export function getProjectSelector() {
  return screen.getByTestId("project-selector")
}

export function getProjectSelectorValueElement(container: HTMLElement) {
  return container.querySelector(".ant-select-selection-item")
}

export function getTaskSelector(): HTMLInputElement {
  return within(screen.getByTestId("task-selector")).getByRole("combobox") as HTMLInputElement
}
