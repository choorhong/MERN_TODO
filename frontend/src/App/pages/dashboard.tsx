import React, { useState, useEffect, useCallback } from 'react'
// import axios from 'axios'
import { print } from 'graphql/language/printer'

import { getTasksQuery } from '../graphql/query'

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
        // const result = await axios({
        //   method: 'get',
        //   url: 'http://localhost:8000',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // })
        // setTasks(result.data.tasks)
        const parsedGetTaskQuery = print(getTasksQuery)
        const response = await fetch(
          'http://localhost:8000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: parsedGetTaskQuery })
          })
        const result = await response.json()
        setTasks(result.data.getTasks)
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
