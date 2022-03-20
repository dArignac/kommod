import { Button, Col, Form, Input, Row } from "antd"
import { ServiceFactory } from "../services/ServiceFactory"

interface FormFields {
  token: string
}

export function Settings() {
  const [form] = Form.useForm()
  const storage = ServiceFactory.getInstance().getStorage()
  const initialValues = {
    token: storage.getToken() || "",
  }

  const onFinish = (values: FormFields) => {
    if (storage.setToken(values.token.trim())) {
      // FIXME snackbar
      console.log("save successfully")
    } else {
      // FIXME snackback
      console.log("failed to save")
    }
  }

  return (
    <Row>
      <Col flex={1} style={{ padding: "0 20px" }}>
        <Form form={form} onFinish={onFinish} initialValues={initialValues}>
          <Form.Item
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 12, offset: 0 }}
            label="toggl.com Token"
            name="token"
            rules={[{ required: true, message: "Please provide your toggl.com token!" }]}
            required
          >
            <Input data-testid="token" />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 4, offset: 4 }}>
            <Button type="primary" htmlType="submit" data-testid="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
