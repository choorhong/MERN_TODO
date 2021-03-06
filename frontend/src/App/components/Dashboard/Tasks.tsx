import React, { useState, useCallback, useContext } from 'react'
// import axios from 'axios'
import { Form, List, Button, Input } from 'antd'
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'

import { SettingContext } from '../../hooks/setting-context'
import { putTaskMutation, deleteTaskMutation } from '../../graphql/mutation'
import { useAuth } from '../../hooks/auth-context'

interface TasksPropsInterface {
  dataSource: [{
    _id: string;
    text: string;
    creator: string;
    updatedAt: string;
    createdAt: string;
  }] | [];
  getTasks: () => {};
}

const graphqlBaseUrl = process.env.REACT_APP_GRAPHQL_BASE_URL

const Tasks = (props: TasksPropsInterface) => {
  const { dataSource, getTasks } = props

  const { context } = useContext(SettingContext)
  const { token } = useAuth()

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
    async (id: string) => {
      const value = form.getFieldValue('task')
      // console.log('value', value)

      try {
        // const result = await axios({
        //   method: 'put',
        //   url: `http://localhost:8000/todo/${id}`,
        //   data: {
        //     text: value
        //   }
        // })

        const variables = {
          input: {
            id: id,
            text: value
          }
        }

        const response = await fetch(
          graphqlBaseUrl!, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: token!
            },
            body: JSON.stringify({ query: putTaskMutation, variables })
          })
        const result = await response.json()

        if (response.status === 200) {
          setEditId(undefined)
          getTasks()
        }
        return result
      } catch (error) {
        console.log('error', error)
      }
    },
    [form, getTasks, token]
  )

  const handleDelete = useCallback(
    async (id) => {
      try {
        // const result = await axios({
        //   method: 'delete',
        //   url: `http://localhost:8000/todo/${id}`
        // })

        const response = await fetch(
          graphqlBaseUrl!, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: token!
            },
            body: JSON.stringify({ query: deleteTaskMutation, variables: { id } })
          })
        const result = await response.json()

        if (response.status === 200) {
          getTasks()
        }
        return result
      } catch (error) {
        console.log('error', error)
      }
    },
    [getTasks, token]
  )
  return (
    <List
      itemLayout='vertical'
      size='large'
      pagination={{
        onChange: page => {
          console.log(page)
        },
        pageSize: context.numOfItemsToBeShown || 5
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
