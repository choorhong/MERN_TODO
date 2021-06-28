import { RequestHandler, Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import Task from '../models/todo'

export const getTasks: RequestHandler = async (req, res, next) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks: tasks })
}

export const createTask: RequestHandler = async (req, res, next) => {
  try {
    const content = new Task({
      text: req.body.text,
      creator: new mongoose.mongo.ObjectID('6093e6a872228b2dc190b595')
    })
    const result = await content.save()
    res.status(201).json({ message: 'Task created successfully', task: result })
  } catch (error) {
    next(error)
  }
}

export const updateTask: RequestHandler<{todoId: string}, Record<string, any>, {text: string}> = async (req, res, next) => {
  try {
    const result = await Task.findByIdAndUpdate(req.params.todoId, { text: req.body.text }, { new: true })
    res.status(200).json({ message: 'Task updated successfully', task: result })
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoId = req.params.todoId
    const tasks = await Task.findByIdAndRemove(todoId)

    res.status(200).json({ message: 'Task deleted successfully.' })
  } catch (error) {
    next(error)
  }
}
