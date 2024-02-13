import { Router } from 'express'
import eventRouter from './events'
import eventSearchRouter from './eventSearch'
import nationRouter from './nations'

const router = Router()

router.use(eventRouter)
router.use(eventSearchRouter)
router.use(nationRouter)

export default router