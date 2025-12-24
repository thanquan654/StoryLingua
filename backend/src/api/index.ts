import { Router } from 'express'
import authRouter from './auth/auth.route.js'
import userRouter from './users/user.route.js'
import storyRouter from './stories/story.route.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/stories', storyRouter)

router.use('/healthcheck', (req, res) => {
	res.status(200)
})

export default router
