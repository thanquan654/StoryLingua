import express from 'express'
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()

app.use(express.json())

// Routes
app.get('/', (req, res) => {
	res.status(200).json({ msg: 'Hello' })
})

app.use(errorHandler)

export default app
