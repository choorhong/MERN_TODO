import React from 'react'
import { Form, Input, Button } from 'antd'
import { useAuth } from '../../hooks/auth-context'

let result: any

const Login = () => {
  const [form] = Form.useForm()
  const { login } = useAuth()

  const handleSubmit = async (values: any) => {
    try {
      result = await login(values.email, values.password)
      console.log('login result', result)
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
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8
          }}
        >
          <Button type='primary' htmlType='submit'>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>

  )
}

export default Login
