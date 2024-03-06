
const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const redis = require('redis')
const expressSession = require('express-session')
const connectRedis = require('connect-redis')
const redisStore = connectRedis(expressSession)

module.exports = function ({ restApi }) {
    return {
        start() {
            const app = express()

            const redisClient = redis.createClient({
				host: 'session-redis',
				port: 6379,
				ttl: 60*60*10,
			})

			redisClient.on('error', function(err) {
				console.log("Could not establish a connection with redis. " + err)
			})

			redisClient.on('connect', function(err){
				console.log("Connected successfully")
			})


            const oneHour = 1000 * 60 * 60;
			app.use(expressSession({
				store: new redisStore({ client: redisClient }),
				secret: "dhjikwedgh",
				saveUninitialized: false,
				resave: false,
				cookie: {maxAge: oneHour},
			}));


            app.use('/rest', restApi)

            app.listen(5000, function () {
                console.log("Running on port 5000!") 
            })
        }
    }
}