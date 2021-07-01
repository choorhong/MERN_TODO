import { Router } from 'express'
import { verifyToken, createOrFindUser } from '../controllers/auth'

const router = Router()

router.post('/create-find-user', verifyToken, createOrFindUser)

export default router
