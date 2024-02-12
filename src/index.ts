import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use(routes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
