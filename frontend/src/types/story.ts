export type Story = {
	id: string
	title: string
	contentJson: {
		data: Array<{
			id: string
			tokens: StoryToken
		}>
	}
	rawContent: string
	genre: string
	difficultyLevel: string
	readingTime: number
	wordCount: number
	isAiGenerated: boolean
	userPrompt: string | null
	creatorId: string | null
	coverImage: string | null
	status: string
	createdAt: string
	updatedAt: string
}

export type StoryToken = Array<{
	l: string
	s: string
	t: string
	pos: string
}>
