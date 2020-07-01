import * as mongoose from 'mongoose'

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env

class DataBase {
	private DB_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_USER}/${DB_NAME}?authSource=admin`
	private DB_CONNECTION

	constructor() {}
	createConnection() {
		mongoose.connect(this.DB_URI, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		this.logger(this.DB_URI)
	}
	closeConnection(message, callback) {
		this.DB_CONNECTION.close(() => {
			console.log('Mongoose foi desconectado pelo' + message)

			callback()
		})
	}

	logger(uri) {
		this.DB_CONNECTION = mongoose.connection
		this.DB_CONNECTION.on('connected', () =>
			console.log('Mongoose está conectado ao ' + uri)
		)
		this.DB_CONNECTION.on('error', (error) =>
			console.error.bind(console, 'Error na conexão: ' + error)
		)
		this.DB_CONNECTION.on('disconnected', () =>
			console.log('Mongoose está desconectado do ' + uri)
		)
	}
}

export default DataBase
