const express = require('express')
const Venue = require('../../venuesService');

module.exports = function ({ }) {
	const router = express.Router()

	router.get("/", function (request, response) {
		console.log("är du här")
		response.render("homepage.hbs")
	})

	return router
}
