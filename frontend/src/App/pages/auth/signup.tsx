import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'

import { useAuth } from '../../hooks/auth-context'

const Signup = () => {
  const [form] = Form.useForm()
  const { signup } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    try {
      await signup(values.email, values.password)
      setIsLoading(false)
    } catch (err) {
      console.log('err', err)
      setIsLoading(false)
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
          label=' Confirm Password'
          name='confirmPassword'
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator (_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              }
            })
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
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Signup
          </Button>

          <Button type='link' style={{ margin: '0 2%' }}>
            <Link to='/auth/login'>Login</Link>
          </Button>

        </Form.Item>
      </Form>
    </div>

  )
}

export default Signup
