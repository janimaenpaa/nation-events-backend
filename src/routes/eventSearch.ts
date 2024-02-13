import { searchEvents } from '../services/eventSearch'
import { Router, Request, Response } from 'express'

const router = Router()

router.get('/api/start-event-search', async (_req: Request, res: Response) => {
  const data = await searchEvents()
  res.json(data)
})

export default router
