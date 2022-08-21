import { Button, notification } from "antd"
import differenceInSeconds from "date-fns/differenceInSeconds"
import { useStoreState } from "pullstate"
import { useEffect } from "react"
import { useMutation } from "react-query"
import { combineDateWithTime, formatTime } from "../../services/date"
import { TogglService } from "../../services/toggl/TogglService"
import { SettingsStore, TimeBookingStore } from "../../store"
import { resetTimeBookingStore } from "../../tests/store"
import { TimeEntry } from "../../types"

interface ActionButtonProps {
  tabIndex: number
  width: number
}

// FIXME stop time before start does not prevent action button click
export function ActionButton({ tabIndex, width }: ActionButtonProps) {
  const token = useStoreState(SettingsStore, (s) => s.token)
  const projectId = useStoreState(TimeBookingStore, (s) => s.projectId)
  const description = useStoreState(TimeBookingStore, (s) => s.description)
  const timeEntry = useStoreState(TimeBookingStore, (s) => s.entry)
  const timeStart = useStoreState(TimeBookingStore, (s) => s.start)
  const timeStop = useStoreState(TimeBookingStore, (s) => s.stop)
  const day = useStoreState(TimeBookingStore, (s) => s.day)

  const mutationUpdateEntry = useMutation<TimeEntry | null, unknown, TimeEntry, unknown>((entry: TimeEntry) => TogglService.getInstance(token).updateTimeEntry(entry), {
    onSuccess(entry, variables, context) {
      if (entry !== null) {
        // reset but set the start date to now
        resetTimeBookingStore(entry.project.id, formatTime(new Date()))
      }
    },
    async onError(error, variables, context) {
      console.error("Error on updating entry", error)
    },
  })

  const hasRunningEntry = timeEntry !== undefined
  const label = timeStop !== undefined || hasRunningEntry ? "Stop" : "Start"
  const enabled = timeEntry !== undefined || (projectId !== undefined && description !== undefined)

  function onClick() {
    if (hasRunningEntry) {
      const start = combineDateWithTime(day, timeStart!!)
      const stop = timeStop !== undefined ? combineDateWithTime(day, timeStop!!) : new Date()

      mutationUpdateEntry.mutate({
        ...timeEntry,
        duration: differenceInSeconds(stop, start),
        start,
        stop,
      })
    }
  }

  function showSuccessNotification() {
    notification.success({
      duration: 1,
      message: "Entry updated.",
      placement: "top",
    })
  }

  function showErrorNotification() {
    notification.error({
      duration: 2,
      message: "Error updating entry.",
      placement: "top",
    })
  }

  useEffect(() => {
    if (mutationUpdateEntry.isSuccess) {
      showSuccessNotification()
      mutationUpdateEntry.reset()
    }
    if (mutationUpdateEntry.isError) {
      showErrorNotification()
      mutationUpdateEntry.reset()
    }
  })

  return (
    <Button data-testid="action-button" tabIndex={tabIndex} style={{ width }} disabled={!enabled} onClick={onClick}>
      {label}
    </Button>
  )
}
