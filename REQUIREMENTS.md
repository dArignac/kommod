# Requirements

## Time entry creation/edit

The tables shows the states and values of the different components composed in CreateEntry.

| Req | TaskSelector | ProjectSelector | StartTimeInput | StopTimeInput | Toggl Entry | ActionButton            |
| --- | ------------ | --------------- | -------------- | ------------- | ----------- | ----------------------- |
| T.1 | irrelevant   | irrelevant      | empty          | irrelevant    | none        | disabled, label "Start" |
| T.2 | has value    | has value       | has value      | empty         | none        | enabled, label "Start"  |
| T.3 | has value    | has value       | has value      | has value     | none        | enabled, label "Save"   |
| T.4 | has value    | has value       | has value      | empty         | running     | enabled, label "Stop"   |
| T.5 | has value    | has value       | has value      | has value     | running     | enabled, label "Stop"   |

- T.1 is the default state
- T.2 creates a running time entry with no stop date
- T.3 create a stopped time entry with start and stop date
- T.4 updates the running entry with now() as stop date
- T.5 updates the running entry with the value of the stop date

### Status

| Component       | I/T.1 | T/T.1 | I/T.2 | T/T.2 | I/T.3 | T/T.3 | I/T.4 | T/T.4 | I/T.5 | T/T.5 |
| --------------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| TaskSelector    | skip  | skip  | skip  | skip  | skip  | skip  | skip  | skip  | skip  | skip  |
| ProjectSelector | skip  | skip  | skip  | skip  | skip  | skip  | skip  | skip  | skip  | skip  |
| StartTimeInput  | skip  | skip  | skip  | skip  | skip  | skip  | skip  | skip  | skip  | skip  |
| StopTimeInput   | skip  | skip  | skip  | skip  | skip  | skip  | skip  | skip  | skip  | skip  |
| ActionButton    | yes   | yes   | yes   | yes   | yes   | yes   | yes   | yes   | yes   | yes   |
| CreateEntry     |       |       |       |       |       |       | yes   | yes   | yes   | yes   |
