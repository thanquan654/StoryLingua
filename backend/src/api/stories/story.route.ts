import { Router } from 'express'
import * as authMiddleware from '../auth/auth.middleware.js'
import * as storyController from '../stories/story.controller.js'

const router = Router()

router.get('/', authMiddleware.authenticateUser, storyController.getAllStories)

export default router
