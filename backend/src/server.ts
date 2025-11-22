import app from './app.js'
import envVar from './config/envVar.js'

app.listen(envVar.port, () => {
	console.log(`Server running on port ${envVar.port}`)
})
