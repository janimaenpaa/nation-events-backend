import { Router, Request, Response } from 'express'
import { getEventById, getEvents, getEventsByNation } from '../services/events'
import { StatusCodes } from 'http-status-codes'

const router = Router()

router.get('/api/events', async (_req: Request, res: Response) => {
  const data = await getEvents()

  if (!data) {
    res.status(StatusCodes.NOT_FOUND).json({ error: 'No events found' })
    return
  }

  res.json({ data })
})

router.get('/api/events/:eventId', async (req: Request, res: Response) => {
  const eventId = Number(req.params.eventId)
  const data = await getEventById(eventId)

  if (!data) {
    res.status(StatusCodes.NOT_FOUND).json({ error: 'Event not found' })
    return
  }

  res.json({ data })
})

router.get('/api/events/nation/:nationId', async (req: Request, res: Response) => {
  const nationId = Number(req.params.nationId)
  const data = await getEventsByNation(nationId)

  if (!data) {
    res.status(StatusCodes.NOT_FOUND).json({ error: 'No events found' })
    return
  }

  res.json({ data })
})

export default router
