import React, { useContext } from 'react'
import { Context } from '../hooks/context'
import { Form, Button, InputNumber } from 'antd'

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
}

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
}

const Setting = () => {
  const { context, setContext } = useContext(Context)

  const [form] = Form.useForm()

  const handleSave = async () => {
    const values = form.getFieldsValue()
    console.log(values, context)
    setContext(c => {
      return {
        ...c,
        numOfItemsToBeShown: values.numOfItems
      }
    })
  }

  return (
    <>
      <Form
        {...layout}
        style={{ paddingTop: '3%' }}
        form={form}
        name='control-hooks'
        onFinish={handleSave}
      >
        <Form.Item
          label='Number of items to be shown:'
          name='numOfItems'
          initialValue={context.numOfItemsToBeShown}
          rules={[
            {
              required: true,
              min: 5,
              max: 20,
              type: 'number',
              message: 'Should be between 5 to 20'
            }
          ]}

        >
          <InputNumber />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Setting
