import { Button } from "antd"
import { useStoreState } from "pullstate"
import { BookingStore } from "../../store"

interface ActionButtonProps {
  tabIndex: number
  width: number
}

// FIXME #38 button needs to check all required values and set them to error
export function ActionButton({ tabIndex, width }: ActionButtonProps) {
  const projectId = useStoreState(BookingStore, (s) => s.projectId)
  const timeEntryDescription = useStoreState(BookingStore, (s) => s.timeEntryDescription)
  const timeEntryId = useStoreState(BookingStore, (s) => s.timEntryId)
  const timeStop = useStoreState(BookingStore, (s) => s.timeStop)

  const label = timeStop !== undefined || timeEntryId !== undefined ? "Stop" : "Start"
  const enabled = timeEntryId !== undefined || (projectId !== undefined && timeEntryDescription !== undefined)

  return (
    <Button data-testid="action-button" tabIndex={tabIndex} style={{ width }} disabled={!enabled}>
      {label}
    </Button>
  )
}
