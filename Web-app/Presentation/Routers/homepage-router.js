const express = require('express')
const Venue = require('../../script')


module.exports = function({}){
	const router = express.Router()

	router.get("/", function(request, response){
		console.log("är du här")
		response.render("homepage.hbs")
	})

	router.get("/venues", async (request, response) => {
		try {
			const venues = await Venue.fetchAllVenues();
			response.render("venues", { venues }); // Pass the venues to the Handlebars template
		} catch (error) {
			console.error('Error fetching venues:', error);
			response.status(500).send('Error fetching venues');
		}
	});

	router.get("/about", function(request, response){
		response.render("about.hbs")
	})

	router.get("/contact", function(request, response){
		response.render("contact.hbs")
	})

	return router
}
