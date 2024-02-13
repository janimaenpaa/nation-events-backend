import { Router, Request, Response } from 'express'
import { getNations } from '../services/nations'

const router = Router()

router.get('/api/nations', async (_req: Request, res: Response) => {
  const data = await getNations()
  res.json(data)
})

export default router
