import React, { useCallback } from 'react'
import axios from 'axios'
import { Form, Input, Button } from 'antd'
import { postTaskMutation } from '../graphql/mutation'

interface InputFormInterface {
    getTasks: () => {}
}

const InputForm = (props: InputFormInterface) => {
  const [form] = Form.useForm()

  const postTask = useCallback(
    async (values) => {
      try {
        // const result = axios({
        //   method: 'post',
        //   url: 'http://localhost:8000',
        //   data: {
        //     text: values.task
        //   }
        // })

        const response = await fetch(
          'http://localhost:8000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: postTaskMutation, variables: { input: { text: values.task } } })
          })
        const result = await response.json()
        return result
      } catch (error) {
        console.log('error', error)
      }
    },
    []
  )

  const handleSubmit = useCallback(
    async () => {
      const values = form.getFieldsValue()
      const result = await postTask(values)
      if (result && result.data && result.data.postTask) {
        props.getTasks()
        form.setFieldsValue({
          task: undefined
        })
      }
    }, [form, postTask, props])

  return (
    <Form
      style={{ display: 'flex', justifyContent: 'space-between' }}
      form={form}
      name='control-hooks'
      onFinish={handleSubmit}
    >
      <Form.Item
        style={{ display: 'inline-flex', width: '90%' }}
        name='task'
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input placeholder='Task' />
      </Form.Item>
      <Form.Item style={{ display: 'inline-flex' }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default InputForm
