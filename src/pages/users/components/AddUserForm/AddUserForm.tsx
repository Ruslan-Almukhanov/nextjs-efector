import { Form, FormProps, Input } from "antd";

const AddUserForm = (props: FormProps) => {
  return (
    <Form {...props}>
      <Form.Item label="Name" name="name">
        <Input></Input>
      </Form.Item>

      <Form.Item label="Username" name="username">
        <Input></Input>
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
        <Input></Input>
      </Form.Item>

      <Form.Item label="Phone" name="phone">
        <Input></Input>
      </Form.Item>

      <Form.Item label="Website" name="website">
        <Input></Input>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;
