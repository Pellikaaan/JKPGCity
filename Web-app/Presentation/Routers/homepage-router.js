const express = require('express')


module.exports = function({}){
	const router = express.Router()

	router.get("/", function(request, response){
		console.log("är du här")
		response.render("homepage.hbs")
	})

	router.get("/about", function(request, response){
		response.render("about.hbs")
	})

	router.get("/contact", function(request, response){
		response.render("contact.hbs")
	})

	return router
}
