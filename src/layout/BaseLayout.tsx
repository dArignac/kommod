import { Layout } from "antd"
import { ReactNode } from "react"
import { Footer } from "../Footer"
import { Header } from "../Header"

const { Content } = Layout

interface BaseLayoutProps {
  content: ReactNode
}

export function BaseLayout({ content }: BaseLayoutProps) {
  return (
    <Layout>
      <Content>
        <Header />
        {content}
      </Content>
      <Footer />
    </Layout>
  )
}
