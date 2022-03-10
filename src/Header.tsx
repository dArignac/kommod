import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button, PageHeader } from "antd"
import { useLocation, useRoute } from "wouter"

export function Header() {
  const [, setLocation] = useLocation()
  const [isOnSettingsPage] = useRoute("/settings")

  const navigation = [
    isOnSettingsPage ? (
      <Button key="home" data-testid="link-home" shape="round" icon={<ArrowLeftOutlined />} onClick={() => setLocation("/")}>
        Back
      </Button>
    ) : (
      <Button key="settings" data-testid="link-settings" shape="round" onClick={() => setLocation("/settings")}>
        Settings
      </Button>
    ),
  ]

  let title = "El Toggl"
  if (isOnSettingsPage) title += " - Settings"

  return <PageHeader className="site-page-header" title={title} extra={navigation} />
}
