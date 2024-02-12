import { searchEvents } from '../handlers/eventSearch'
import { Router, Request, Response } from 'express'

const router = Router()

router.get('/api/start-event-search', async (req: Request, res: Response) => {
  const data = await searchEvents(req, res)
  res.json(data)
})

export default router
