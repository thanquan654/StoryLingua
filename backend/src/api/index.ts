import { Router } from 'express'
import authRouter from './auth/auth.route.js'
import userRouter from './user/user.route.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)

router.use('/healthcheck', (req, res) => {
	res.status(200)
})

export default router
