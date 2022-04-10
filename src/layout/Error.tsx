import { Col, Result, Row } from "antd"
import { ResultStatusType } from "antd/lib/result"
import { ReactNode } from "react"

interface ErrorProps {
  status: ResultStatusType
  title: string
  subTitle?: string
  extra?: ReactNode
}

export function Error({ status, title, subTitle, extra }: ErrorProps) {
  return (
    <Row justify="center">
      <Col span={22}>
        <Result status={status} title={title} subTitle={subTitle} extra={extra} />
      </Col>
    </Row>
  )
}
