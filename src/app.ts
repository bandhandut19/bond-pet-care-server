import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/router'
const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())
app.use('/api', router)
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Bond Pet Care Backend')
})

export default app
