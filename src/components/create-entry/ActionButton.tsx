import { Button } from "antd"

interface ActionButtonProps {
  tabIndex: number
  width: number
}

// FIXME #38 button needs to check all required values and set them to error
export function ActionButton({ tabIndex, width }: ActionButtonProps) {
  return (
    <Button tabIndex={tabIndex} style={{ width }}>
      Start
    </Button>
  )
}
