import React from 'react'

import { List } from 'antd'

interface TasksPropsInterface {
    dataSource: [{
        _id: string;
        text: string;
        creator: string;
        updatedAt: string;
        createdAt: string;
    }] | []
}

const Tasks = (props: TasksPropsInterface) => {
  const { dataSource } = props

  return (
    <List
      itemLayout='vertical'
      size='large'
      pagination={{
        onChange: page => {
          console.log(page)
        },
        pageSize: 10
      }}
      dataSource={dataSource}
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

export default Tasks
//   <pre>{JSON.stringify(tasks, null, 2)}</pre>
