import { act, fireEvent } from "@testing-library/react"

export function inputValueAndBlur(input: HTMLElement, value: string) {
  act(() => input.focus())
  fireEvent.change(input, { target: { value } })
  act(() => input.blur())
}
