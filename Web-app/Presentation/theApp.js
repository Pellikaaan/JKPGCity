
const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const redis = require('redis')
const expressSession = require('express-session')


//module.exports = function ({ restApi }) {
//	return {
		//start() {
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
				layoutsDir: path.join(__dirname, 'layouts')
			}))

			app.set('Views', path.join(__dirname, "views"))
		
			app.use('/', variousRouter)
			
			app.listen(5001, function () {
				console.log("Running on port 5001!")
			})

	
		//}
//	}
//}