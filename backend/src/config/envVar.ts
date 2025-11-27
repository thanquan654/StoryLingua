import dotenv from 'dotenv'

dotenv.config()

interface Config {
	port: number
	nodeEnv: string
    clientUrl: string
}

const config: Config = {
	port: Number(process.env.PORT) || 3001,
	nodeEnv: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENTURL || 'localhost:3001'
}

export default config
