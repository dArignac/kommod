import { Button } from "antd"
import { useStoreState } from "pullstate"
import { BookingStore } from "../../store"

interface ActionButtonProps {
  tabIndex: number
  width: number
}

// FIXME #38 button needs to check all required values and set them to error
export function ActionButton({ tabIndex, width }: ActionButtonProps) {
  const timeEntryId = useStoreState(BookingStore, (s) => s.timEntryId)
  const timeStop = useStoreState(BookingStore, (s) => s.timeStop)

  let label = "Start"

  if (timeStop !== undefined || timeEntryId !== undefined) {
    label = "Stop"
  }

  return (
    <Button data-testid="action-button" tabIndex={tabIndex} style={{ width }}>
      {label}
    </Button>
  )
}
