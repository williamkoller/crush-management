import App from './app'

App.app.listen(process.env.SERVER_PORT || 5000, () =>
	console.log(`servidor rodando na porta: ${process.env.SERVER_PORT}`)
)

process.once('SIGUSR2', () =>
	App.closeDataBaseConnection('nodemon restart', () =>
		process.kill(process.pid, 'SIGUSR2')
	)
)

process.once('SIGINT', () =>
	App.closeDataBaseConnection('execução foi interrompida', () =>
		process.exit(0)
	)
)
