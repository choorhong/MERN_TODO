import React, { useState, useEffect, useCallback } from 'react'
// import axios from 'axios'
import { print } from 'graphql/language/printer'

import { getTasksQuery } from '../graphql/query'

import InputForm from '../components/Dashboard/InputForm'
import Tasks from '../components/Dashboard/Tasks'

import NavBar from '../components/Layouts/NavBar'
import { useAuth } from '../hooks/auth-context'

type TasksInterface = [{
        _id: string;
        text: string;
        creator: string;
        createdAt: string;
        updatedAt: string;
    }]

const graphqlBaseUrl = process.env.REACT_APP_GRAPHQL_BASE_URL

const Dashboard = () => {
  const [tasks, setTasks] = useState<TasksInterface | []>([])
  const { token } = useAuth()

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

        // Converts an AST (Abstract Syntax Tree) into a string
        const parsedGetTaskQuery = print(getTasksQuery)
        const response = await fetch(
          graphqlBaseUrl!, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: token!
            },
            body: JSON.stringify({ query: parsedGetTaskQuery })
          }
        )
        const result = await response.json()
        setTasks(result.data.getTasks)
      } catch (error) {
        console.log('error', error)
      }
    },
    [token]
  )

  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <NavBar>
      <InputForm getTasks={getTasks} />
      <Tasks dataSource={tasks} getTasks={getTasks} />
    </NavBar>
  )
}

export default Dashboard
