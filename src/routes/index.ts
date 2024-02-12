import { Router } from 'express'
import eventSearchRouter from './eventSearch'

const router = Router()

router.use(eventSearchRouter)

export default router