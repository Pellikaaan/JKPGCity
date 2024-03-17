
const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const redis = require('redis')


module.exports = function ({ homepageRouter, venuesRouter, restAPIRouter }) {
	return {
		start() {
			const app = express()

			const redisClient = redis.createClient({
				host: 'session-redis',
				port: 6379,
				ttl: 60 * 60 * 10,
			})

			redisClient.on('error', function (err) {
				console.log("Could not establish a connection with redis. " + err)
			})

			redisClient.on('connect', function (err) {
				console.log("Connected successfully")
			})


			app.engine('hbs', expressHandlebars.engine({
				extname: 'hbs',
				defaultLayout: 'main.hbs',
				layoutsDir: path.join(__dirname, 'Presentation','layouts')
			}))
			app.use(express.static(path.join(__dirname, 'public')))
			app.set('view engine', 'hbs');

			app.set('views', path.join(__dirname, 'Presentation', 'Views'));

			app.use('/', homepageRouter)
			app.use('/venues', venuesRouter)
			app.use('/createVenue',venuesRouter)
			app.use('/api', restAPIRouter)
		
			app.listen(5001, function () {
				console.log("Running on port 5001!")
			})

	
		}
	}
}