import React, { useState, useCallback, useContext } from 'react'
import axios from 'axios'
import { Form, List, Button, Input } from 'antd'
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'

import { Context } from '../hooks/context'

interface TasksPropsInterface {
    dataSource: [{
        _id: string;
        text: string;
        creator: string;
        updatedAt: string;
        createdAt: string;
    }] | [];
    getTasks: () => {}
}

const Tasks = (props: TasksPropsInterface) => {
  const { dataSource, getTasks } = props

  const { context } = useContext(Context)

  const [form] = Form.useForm()
  const [editId, setEditId] = useState()

  const handleEditId = useCallback(
    (item) => {
      setEditId(item._id)
      form.setFieldsValue({ task: item.text })
    },
    [form]
  )

  const handleUpdate = useCallback(
    async (id) => {
      const value = form.getFieldValue('task')
      console.log('value', value)

      try {
        const result = await axios({
          method: 'put',
          url: `http://localhost:8000/todo/${id}`,
          data: {
            text: value
          }

        })
        if (result.status === 200) {
          setEditId(undefined)
          getTasks()
        }
        return result
      } catch (error) {
        console.log('error', error)
      }
    },
    [form, getTasks]
  )

  const handleDelete = useCallback(
    async (id) => {
      try {
        const result = await axios({
          method: 'delete',
          url: `http://localhost:8000/todo/${id}`
        })
        if (result.status === 200) {
          getTasks()
        }
        return result
      } catch (error) {
        console.log('error', error)
      }
    },
    [getTasks]
  )
  return (
    <List
      itemLayout='vertical'
      size='large'
      pagination={{
        onChange: page => {
          console.log(page)
        },
        pageSize: context.numOfItemsToBeShown
      }}
      dataSource={dataSource}
      renderItem={item => {
        if (item._id === editId) {
          return (
            <Form
              form={form}
              name='control-hooks'
              key={item._id}
              onFinish={() => {}}
            >
              <List.Item
                style={{ display: 'flex', alignItems: 'center' }}
                extra={
                  <Button
                    htmlType='submit'
                    shape='circle' size='small'
                    icon={<CheckOutlined onClick={() => handleUpdate(item._id)} />}
                  />
                }
              >
                <Form.Item
                  name='task'
                  style={{ marginBottom: '0px' }}
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <Input
                    style={{ alignSelf: 'center' }}
                    placeholder='Task'
                  />
                </Form.Item>
              </List.Item>
            </Form>
          )
        }
        return (
          <List.Item
            key={item._id}
            extra={
              <div>
                <Button style={{ margin: '0 0.5rem 0 0.5rem' }} shape='circle' size='small' icon={<EditOutlined onClick={() => handleEditId(item)} />} />
                <Button shape='circle' danger size='small' icon={<CloseOutlined onClick={() => handleDelete(item._id)} />} />
              </div>
          }
          >
            {item.text}
          </List.Item>
        )
      }}
    />
  )
}

export default Tasks
