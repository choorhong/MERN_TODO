import { Router } from 'express'
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/todo'

const router = Router()

router.get('/', getTasks)

router.post('/', createTask)

router.put('/:todoId', updateTask)

router.delete('/:todoId', deleteTask)

export default router
