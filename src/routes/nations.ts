import { Router, Request, Response } from 'express'
import { getNations } from '../services/nations'
import { handleServiceResponse } from '../utils/httpHandlers'

const router = Router()

router.get('/api/nations', async (_req: Request, res: Response) => {
  const serviceResponse = await getNations()
  handleServiceResponse(serviceResponse, res)
})

export default router
