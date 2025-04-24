import { useState, useEffect } from 'react'
import { Modal, Input, Form } from 'antd'

const UserForm = ({ open, onClose, onSave, editUser }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (editUser) {
      form.setFieldsValue(editUser)
    } else {
      form.resetFields()
    }
  }, [editUser, form])

  const handleOk = () => {
    form.validateFields().then(values => {
      onSave(values)
      form.resetFields()
    })
  }

  return (
    <Modal
      title={editUser ? 'Edit User' : 'Add User'}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Save"
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Age" name="age" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserForm
