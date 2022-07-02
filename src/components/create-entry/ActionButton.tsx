import { Button, notification } from "antd"
import { useStoreState } from "pullstate"
import { useEffect } from "react"
import { useMutation } from "react-query"
import { TogglService } from "../../services/toggl/TogglService"
import { BookingStore, SettingsStore } from "../../store"
import { resetBookingStore } from "../../tests/store"
import { TimeEntry } from "../../types"

interface ActionButtonProps {
  tabIndex: number
  width: number
}

export function ActionButton({ tabIndex, width }: ActionButtonProps) {
  const token = useStoreState(SettingsStore, (s) => s.token)
  const projectId = useStoreState(BookingStore, (s) => s.projectId)
  const timeEntryDescription = useStoreState(BookingStore, (s) => s.timeEntryDescription)
  const timeEntryId = useStoreState(BookingStore, (s) => s.timeEntryId)
  const timeStop = useStoreState(BookingStore, (s) => s.timeStop)
  const mutationStopEntry = useMutation<TimeEntry | null, unknown, number, unknown>((timeEntryId) => {
    const entry = TogglService.getInstance(token).stopTimeEntry(timeEntryId)
    if (entry !== null) {
      resetBookingStore()
    }
    return entry
  })
  const mutationUpdateEntry = useMutation<TimeEntry | null, unknown, TimeEntry, unknown>((entry: TimeEntry) => {
    const updatedEntry = TogglService.getInstance(token).updateTimeEntry(entry)
    if (updatedEntry !== null) {
      resetBookingStore()
    }
    return updatedEntry
  })

  const hasRunningEntry = timeEntryId !== undefined
  const label = timeStop !== undefined || hasRunningEntry ? "Stop" : "Start"
  const enabled = timeEntryId !== undefined || (projectId !== undefined && timeEntryDescription !== undefined)

  function onClick() {
    if (hasRunningEntry) {
      if (timeStop !== undefined) {
        // FIXME implement
      } else {
        mutationStopEntry.mutate(timeEntryId)
      }
    }
  }

  function showSuccessNotification() {
    notification.success({
      message: "Entry updated.",
      placement: "top",
    })
  }

  function showErrorNotification() {
    notification.error({
      message: "Error updating entry.",
      placement: "top",
    })
  }

  useEffect(() => {
    if (mutationStopEntry.isSuccess) {
      showSuccessNotification()
      mutationStopEntry.reset()
    }
    if (mutationStopEntry.isError) {
      showErrorNotification()
      mutationStopEntry.reset()
    }
  })

  return (
    <Button data-testid="action-button" tabIndex={tabIndex} style={{ width }} disabled={!enabled} onClick={onClick}>
      {label}
    </Button>
  )
}
