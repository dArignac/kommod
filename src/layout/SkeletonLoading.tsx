import { Col, Row, Skeleton } from "antd"

interface SkeletonLoadingProps {
  rows?: number
}

export function SkeletonLoading({ rows = 6 }: SkeletonLoadingProps) {
  return (
    <Row justify="center" data-testid="skeleton-loading">
      <Col flex="99%">
        <Skeleton active={true} paragraph={{ rows }} />
      </Col>
    </Row>
  )
}
