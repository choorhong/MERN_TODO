import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import Task from '../models/todo'

export const getTasks = async(req: Request, res: Response, next: NextFunction) => {
    const tasks = await Task.find({})
    return res.status(200).json({tasks: tasks})
}

export const postTask = async (req: Request, res: Response, next: NextFunction) => {
    const content = new Task({
        text: req.body.text,
        creator: new mongoose.mongo.ObjectID('6093e6a872228b2dc190b595')
    })
    const result = await content.save()
    return res.status(201).json({message: 'Task created successfully', task: result})
}

export const putTask = async (req: Request, res: Response, next: NextFunction) => {
    const todoId = new mongoose.mongo.ObjectID(req.params.todoId)
    await Task.updateOne({ _id: todoId }, { $set: { text: req.body.text } });
    return res.status(200).json({message: 'Task updated successfully'})
}

export const deleteTask = async(req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.todoId
    const tasks = await Task.findByIdAndRemove(todoId)

    res.status(200).json({ message: 'Task deleted successfully.' });

}
