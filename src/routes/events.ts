import { Router, Request, Response } from 'express'
import { getEventById, getEvents, getEventsByNation, getEventsThisWeek } from '../services/events'
import { handleServiceResponse } from '../utils/httpHandlers'

const router = Router()

router.get('/api/events', async (_req: Request, res: Response) => {
  const serviceResponse = await getEvents()
  handleServiceResponse(serviceResponse, res)
})

router.get('/api/events/this-week', async (_req: Request, res: Response) => {
  const serviceResponse = await getEventsThisWeek()
  handleServiceResponse(serviceResponse, res)
})

router.get('/api/events/:eventId', async (req: Request, res: Response) => {
  const eventId = Number(req.params.eventId)
  const serviceResponse = await getEventById(eventId)
  handleServiceResponse(serviceResponse, res)
})

router.get('/api/events/nation/:nationId', async (req: Request, res: Response) => {
  const nationId = Number(req.params.nationId)
  const serviceResponse = await getEventsByNation(nationId)
  handleServiceResponse(serviceResponse, res)
})

export default router
