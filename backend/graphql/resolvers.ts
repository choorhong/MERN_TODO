import { Request, Response, NextFunction } from 'express'

import mongoose from 'mongoose'
import Task from '../models/todo'

interface IInputTask {
  input: {
    id?: string
    text: string
  }
}

const graphqlResolvers = {
  getSimpleTest: () => 'Hello World',

  getTasks: async () => {
    const tasks = await Task.find({})
    return tasks
  },

  postTask: async (args: IInputTask, req: Request) => {
    const { input } = args

    const content = new Task({
      text: input.text,
      creator: new mongoose.mongo.ObjectID('6093e6a872228b2dc190b595')
    })
    const result = await content.save()
    return {
      message: 'Task created successfully',
      task: result
    }
  },

  putTask: async (args: IInputTask, req: Request) => {
    const { input } = args
    const result = await Task.findByIdAndUpdate(input.id, { text: input.text }, { new: true })
    const tasks = await Task.find({})
    return {
      message: 'Task updated successfully',
      task: result,
      tasks: tasks
    }
  },

  deleteTask: async (args: { id: string }, req: Request) => {
    const todoId = args.id
    const tasks = await Task.findByIdAndRemove(todoId)
    return {
      message: 'Task deleted successfully'
    }
  }

}

export default graphqlResolvers
