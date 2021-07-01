import React from 'react'
import { List } from 'antd'

interface TasksInterface {
  tasks: [{
      _id: string;
      text: string;
      creator: string;
      updatedAt: string;
      createdAt: string;
  }]
}

const Task = (props: TasksInterface) => {
  return (
    <List
      itemLayout='vertical'
      size='large'
      pagination={{
        onChange: page => {
          console.log(page)
        },
        pageSize: 3
      }}
      dataSource={props.tasks}
      renderItem={item => (
        <List.Item
          key={item._id}
        >
          {/* <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            /> */}
          {item.text}
        </List.Item>
      )}
    />
  )
}

export default Task
