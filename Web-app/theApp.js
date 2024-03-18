
const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const redis = require('redis')
const expressSession = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const mongoose = require('mongoose');



module.exports = function ({ homepageRouter, venuesRouter, restAPIRouter,loginRouter }) {
	return {
		start() {
			const app = express()
			
			app.use(express.static(path.join(__dirname, 'Presentation', 'layouts')));

			  
			  const oneHour = 1000 * 60 * 60;
			

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
			app.use('/login',loginRouter)
		
			app.listen(5001, function () {
				console.log("Running on port 5001!")
			})

	
		}
	}
}