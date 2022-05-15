import { Select } from "antd"

const { Option } = Select

// FIXME #38 implement
export function ProjectSelector() {
  return (
    <Select style={{ width: 400 }} tabIndex={2}>
      <Option value="1">xxx</Option>
    </Select>
  )
}
