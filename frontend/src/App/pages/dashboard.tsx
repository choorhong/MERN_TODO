import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import InputForm from '../components/InputForm'
import Tasks from '../components/Tasks'

type TasksInterface = [{
        _id: string;
        text: string;
        creator: string;
        createdAt: string;
        updatedAt: string;
    }]

const Dashboard = () => {
  const [tasks, setTasks] = useState<TasksInterface | []>([])

  const getTasks = useCallback(
    async () => {
      try {
        const result = await axios({
          method: 'get',
          url: 'http://localhost:8000',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setTasks(result.data.tasks)
        console.log('result', result)
      } catch (error) {
        console.log('error', error)
      }
    },
    []
  )

  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <>
      <InputForm getTasks={getTasks} />
      <Tasks dataSource={tasks} getTasks={getTasks} />

    </>
  )
}

export default Dashboard
