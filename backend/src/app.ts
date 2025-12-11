import express from 'express'
import { errorHandler } from './middlewares/errorHandler.js'
import morgan from 'morgan'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import envVar from './config/envVar.js'
import appRouter from './api/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
	cors({
		origin: envVar.clientUrl,
		credentials: true,
	}),
)
app.use(morgan('combined'))
app.use(
	rateLimit({
		max: 1000,
		windowMs: 15 * 60 * 1000,
	}),
)

// Routes
app.use('/api/', appRouter)

app.use(errorHandler)

export default app
