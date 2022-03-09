import { Button } from "antd"
import { useLocation } from "wouter"

export function Navigation() {
  const [, setLocation] = useLocation()
  return (
    <>
      <Button data-testid="link-settings" onClick={() => setLocation("/settings")}>
        Settings
      </Button>
    </>
  )
}
