import type { NextFunction, Request, Response } from 'express'
import { getProfileById } from './user.service.js'

export const getUserProfile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userId = req.user?.userId

		if (!userId) {
			return res.status(404).json({
				message: 'Dont have userId',
			})
		}

		const userProfile = await getProfileById(userId)

		if (!userProfile) {
			return res.status(404).json({ message: 'User not found' })
		}

		return res.status(200).json({
			message: 'Get profile successfuly',
			data: userProfile,
		})
	} catch (error) {
		next()
	}
}
