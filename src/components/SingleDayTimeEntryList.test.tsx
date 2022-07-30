import { render } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { SingleDayTimeEntryList } from "./SingleDayTimeEntryList"

test("renders the component", () => {
  const queryClient = new QueryClient()
  render(
    <QueryClientProvider client={queryClient}>
      <SingleDayTimeEntryList />
    </QueryClientProvider>
  )
})
