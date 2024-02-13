import { Router, Request, Response } from 'express'
import { getEvents, getEventsByNation } from '../services/events'

const router = Router()

router.get('/api/events', async (_req: Request, res: Response) => {
  const data = await getEvents()

  res.json(data)
})

router.get('/api/events/:nationId', async (req: Request, res: Response) => {
  const nationId = Number(req.params.nationId)
  const data = await getEventsByNation(nationId)

  res.json(data)
})

export default router
