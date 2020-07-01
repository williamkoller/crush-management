import * as express from 'express'
import * as morgan from 'morgan'
import * as bodyParser from 'body-parser'
import Database from './config/db'
import CrushRoutes from './modules/crush/routes'

class App {
	public app: express.Application
	private morgan
	private bodyParser
	private database: Database

	constructor() {
		this.app = express()
		this.middleware()
		this.routes()
		this.database = new Database()
		this.dataBaseConnection()
		this.app.route('/api/crushs').get(CrushRoutes.getAll)
		this.app.route('/api/crushs/:id').get(CrushRoutes.getById)
		this.app.route('/api/crushs').post(CrushRoutes.create)
		this.app.route('/api/crushs/:id').put(CrushRoutes.update)
		this.app.route('/api/crushs/:id').delete(CrushRoutes.delete)
	}

	middleware() {
		this.app.use(morgan('dev'))
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({ extended: true }))
	}

	routes() {
		this.app
			.route('/')
			.get((req, res) => res.status(200).json({ message: 'Hello World' }))
	}

	dataBaseConnection() {
		this.database.createConnection()
	}

	closeDataBaseConnection(message, callback) {
		this.database.closeConnection(message, () => callback())
	}
}

export default new App()
