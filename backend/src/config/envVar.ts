import dotenv from 'dotenv'

dotenv.config()

interface Config {
	port: number
	nodeEnv: string
	clientUrl: string

	// JTW
	jwtSecret: string
}

const config: Config = {
	port: Number(process.env.PORT) || 3001,
	nodeEnv: process.env.NODE_ENV || 'development',
	clientUrl: process.env.CLIENT_URL || 'localhost:3000',
	jwtSecret: process.env.JWT_ACCESS_SECRET!,
}

export default config
