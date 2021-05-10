import { Router } from 'express'
import { getTasks, postTask, putTask, deleteTask } from '../controllers/todo'

const router = Router()

router.get('/', getTasks)

router.post('/', postTask)

router.put('/todo/:todoId', putTask)

router.delete('/todo/:todoId', deleteTask)

export default router