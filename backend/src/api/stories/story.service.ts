import type { Story } from '../../../generated/prisma/index.js'
import { prisma } from '../../config/prisma.js'

export const getStories = (
	filters: { genre: string | undefined; level: string | undefined },
	page: number,
): Promise<Story[]> => {
	return prisma.story.findMany({
		where: {
			...(filters.genre && {
				genre: filters.genre,
			}),
			...(filters.level && {
				difficultyLevel: filters.level,
			}),
		},
		skip: (page - 1) * 12,
		take: 12,
	})
}
