import { Button } from "antd"
import { useStoreState } from "pullstate"
import { useMutation } from "react-query"
import { TogglService } from "../../services/toggl/TogglService"
import { BookingStore, SettingsStore } from "../../store"
import { TimeEntry } from "../../types"

interface ActionButtonProps {
  tabIndex: number
  width: number
}

export function ActionButton({ tabIndex, width }: ActionButtonProps) {
  const token = useStoreState(SettingsStore, (s) => s.token)
  const projectId = useStoreState(BookingStore, (s) => s.projectId)
  const timeEntryDescription = useStoreState(BookingStore, (s) => s.timeEntryDescription)
  const timeEntryId = useStoreState(BookingStore, (s) => s.timEntryId)
  const timeStop = useStoreState(BookingStore, (s) => s.timeStop)
  const mutation = useMutation<TimeEntry | null, unknown, number, unknown>((x) => {
    return TogglService.getInstance(token).stopTimeEntry(x)
  })

  const hasRunningEntry = timeEntryId !== undefined
  const label = timeStop !== undefined || hasRunningEntry ? "Stop" : "Start"
  const enabled = timeEntryId !== undefined || (projectId !== undefined && timeEntryDescription !== undefined)

  function onClick() {
    if (hasRunningEntry) {
      mutation.mutate(timeEntryId)
    }
  }

  return (
    <Button data-testid="action-button" tabIndex={tabIndex} style={{ width }} disabled={!enabled} onClick={onClick}>
      {label}
    </Button>
  )
}
