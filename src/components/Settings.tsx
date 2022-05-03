import { Alert, Button, Col, Form, Input, Row } from "antd"
import { useStoreState } from "pullstate"
import { Controller, useForm } from "react-hook-form"
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

  return (
    <Row>
      <Col flex={1} style={{ padding: "0 20px" }}>
        <form onSubmit={onSubmit}>
          <Form.Item labelCol={{ span: 4 }} wrapperCol={{ span: 12, offset: 0 }} label="toggl.com Token">
            <Controller
              name="token"
              control={control}
              rules={{ required: true }}
              defaultValue={settings.token}
              render={({ field }) => <Input status={errors.token ? "error" : ""} data-testid="token" {...field} />}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 4 }} hidden={!errors.token}>
            {errors.token && <Alert type="error" message="Token is required, please provide!" />}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 4, offset: 4 }}>
            <Button type="primary" htmlType="submit" data-testid="submit">
              Submit
            </Button>
          </Form.Item>
        </form>
      </Col>
    </Row>
  )
}
