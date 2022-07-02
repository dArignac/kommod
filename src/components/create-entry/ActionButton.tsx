import { Button, notification } from "antd"
import differenceInSeconds from "date-fns/differenceInSeconds"
import { useStoreState } from "pullstate"
import { useEffect } from "react"
import { useMutation } from "react-query"
import { combineDateWithTime } from "../../services/date"
import { TogglService } from "../../services/toggl/TogglService"
import { SettingsStore, TimeBookingStore } from "../../store"
import { resetTimeBookingStore } from "../../tests/store"
import { TimeEntry } from "../../types"

interface ActionButtonProps {
  tabIndex: number
  width: number
}

// FIXME stop time before start does not prevent action button click
// FIXME stop label is not changed to start after stopping
export function ActionButton({ tabIndex, width }: ActionButtonProps) {
  const token = useStoreState(SettingsStore, (s) => s.token)
  const projectId = useStoreState(TimeBookingStore, (s) => s.projectId)
  const description = useStoreState(TimeBookingStore, (s) => s.description)
  const timeEntry = useStoreState(TimeBookingStore, (s) => s.entry)
  const timeStart = useStoreState(TimeBookingStore, (s) => s.start)
  const timeStop = useStoreState(TimeBookingStore, (s) => s.stop)
  const day = useStoreState(TimeBookingStore, (s) => s.day)
  const mutationStopEntry = useMutation<TimeEntry | null, unknown, number, unknown>((timeEntryId) => {
    const entry = TogglService.getInstance(token).stopTimeEntry(timeEntryId)
    if (entry !== null) {
      resetTimeBookingStore()
    }
    return entry
  })
  const mutationUpdateEntry = useMutation<TimeEntry | null, unknown, TimeEntry, unknown>((entry: TimeEntry) => {
    const updatedEntry = TogglService.getInstance(token).updateTimeEntry(entry)
    if (updatedEntry !== null) {
      resetTimeBookingStore()
    }
    return updatedEntry
  })

  const hasRunningEntry = timeEntry !== undefined
  const label = timeStop !== undefined || hasRunningEntry ? "Stop" : "Start"
  const enabled = timeEntry !== undefined || (projectId !== undefined && description !== undefined)

  function onClick() {
    if (hasRunningEntry) {
      if (timeStop !== undefined) {
        const start = combineDateWithTime(day, timeStart!!)
        const stop = combineDateWithTime(day, timeStop!!)
        mutationUpdateEntry.mutate({
          ...timeEntry,
          duration: differenceInSeconds(stop, start),
          start,
          stop,
        })
      } else {
        mutationStopEntry.mutate(timeEntry.id)
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
    if (mutationStopEntry.isSuccess || mutationUpdateEntry.isSuccess) {
      showSuccessNotification()
      mutationStopEntry.reset()
      mutationUpdateEntry.reset()
    }
    if (mutationStopEntry.isError || mutationUpdateEntry.isError) {
      showErrorNotification()
      mutationStopEntry.reset()
      mutationUpdateEntry.reset()
    }
  })

  return (
    <Button data-testid="action-button" tabIndex={tabIndex} style={{ width }} disabled={!enabled} onClick={onClick}>
      {label}
    </Button>
  )
}
