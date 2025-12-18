import type { Request, Response, NextFunction } from 'express'
import { getStories } from './story.service.js'

export const getAllStories = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { genre, level, page } = req.query

	if (isNaN(Number(page))) {
		return res.status(400).json({
			message: 'Invalid page number',
		})
	}

	try {
		const stories = await getStories(
			{ genre: genre as string, level: level as string },
			Number(page),
		)

		return res.status(200).json({ message: 'OK', data: { stories } })
	} catch (error) {
		next(error)
	}
}
