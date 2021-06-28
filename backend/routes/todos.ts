import { Router } from 'express'
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/todo'

const router = Router()

router.get('/', getTasks)

router.post('/', createTask)

router.put('/todo/:todoId', updateTask)

router.delete('/todo/:todoId', deleteTask)

export default router
