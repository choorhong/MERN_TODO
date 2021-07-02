import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'

import { useAuth } from '../../hooks/auth-context'

const ResetPassword = () => {
  const [form] = Form.useForm()
  const { reset } = useAuth()

  const handleSubmit = async (values: any) => {
    try {
      reset(values.email)
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <Form
        name='basic'
        form={form}
        style={{ width: '100%' }}
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 8
        }}
        initialValues={{
          remember: true
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your username!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8
          }}
        >
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>

          <Button type='link' style={{ margin: '0 2%' }}>
            <Link to='/auth/login'>Back to Login</Link>
          </Button>

        </Form.Item>
      </Form>
    </div>

  )
}

export default ResetPassword
