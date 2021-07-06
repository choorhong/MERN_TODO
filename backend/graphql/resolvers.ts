import { Request, Response, NextFunction } from 'express'

import Task from '../models/todo'
import User from '../models/user'

interface IInputTask {
  input: {
    id?: string
    text: string
  }
}

interface IContext {
  req: Request;
  res: Response;
  next: NextFunction;
}

const graphqlResolvers = {
  getSimpleTest: () => 'Hello World',

  getTasks: async () => {
    const tasks = await Task.find({})
    return tasks
  },

  postTask: async (args: IInputTask, context: IContext) => {
    const { input } = args

    const { firebaseUser } = context.res.locals
    try {
      const user = await User.findOne({ email: firebaseUser.email }, { __v: 0 })
      if (!user) throw new Error('NO_USER_FOUND')

      const content = new Task({
        text: input.text,
        creator: user._id
      })
      const result = await content.save()
      user.tasks.push(result)
      await user.save()
      return {
        message: 'Task created successfully',
        task: result
      }
    } catch (error) {
      context.next(error)
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

  deleteTask: async (args: { id: string }, context: IContext) => {
    const todoId = args.id
    const { firebaseUser } = context.res.locals

    try {
      const user = await User.findOne({ email: firebaseUser.email }, { __v: 0 })
      if (!user) throw new Error('NO_USER_FOUND')

      await Task.findByIdAndRemove(todoId)
      user.tasks.pull(todoId)
      await user.save()

      return {
        message: 'Task deleted successfully'
      }
    } catch (error) {
      context.next(error)
    }
  }

}

export default graphqlResolvers
