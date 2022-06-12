# Requirements

## Time entry creation/edit

### (A) Active entries

- A.1 if there is an active entry, then description, project and start are prefilled and the action button states "Stop"
- A.2 an active entry can only be stopped with the stop button
  - A.2.1 start and end time are adjustable and reflected when stopped
- A.3 if end is not set, the entry is stopped with now()
- A.4 if end is set, the entry is stopped with the value of end
- A.5 after stopping an entry, task and end is cleared, start is set to now()

### (B) Adding entries

- B.1 the default text of the action button is "Start"
- B.2 if task and project are set, then a new and active entry is created with datetime.now()
- B.3 if task, project and start are set, then a new and active entry is created with start time
- B.4 if task, project, start and end are set, then a new, finished entry is created with start and end time

## Status

| Req   | Implementation | Tests   |
| ----- | -------------- | ------- |
| A.1   | done           | done    |
| A.2   | incomplete     | missing |
| A.2.1 |                |         |
| A.3   |                |         |
| A.4   |                |         |
| A.5   |                |         |
| B.1   |                |         |
| B.2   |                |         |
| B.3   |                |         |
| B.4   |                |         |
