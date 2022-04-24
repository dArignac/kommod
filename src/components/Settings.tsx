import { Button, Col, Form, Input, Row } from "antd"
import { useStoreState } from "pullstate"
import { Controller, useForm } from "react-hook-form"
import { SkeletonLoading } from "../layout/SkeletonLoading"
import { SettingsStore } from "../store"

type FormValues = {
  token: string
}

export function Settings() {
  const settings = useStoreState(SettingsStore)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = handleSubmit((data) => {
    SettingsStore.update((s) => {
      s.token = data.token.trim()
    })
  })

  // FIXME remove the storage ready stuff as handled in App.tsx
  return (
    <Row>
      <Col flex={1} style={{ padding: "0 20px" }}>
        {settings.isStorageReady ? (
          <form onSubmit={onSubmit}>
            <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 12, offset: 0 }} label="toggl.com Token">
              <Controller
                name="token"
                control={control}
                rules={{ required: true }}
                defaultValue={settings.token}
                render={({ field }) => <Input data-testid="token" {...field} />}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 4, offset: 4 }}>
              <Button type="primary" htmlType="submit" data-testid="submit">
                Submit
              </Button>
            </Form.Item>
            {errors.token && <>FIXME (styling) Token is required</>}
          </form>
        ) : (
          <SkeletonLoading />
        )}
      </Col>
    </Row>
  )
}
