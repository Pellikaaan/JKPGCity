const express = require('express');
const Venue = require('../../venuesService');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


module.exports = function ({ }) {
    const router = express.Router();
    router.use(bodyParser.json())
    router.use(express.urlencoded({
        extended: false,
    }))

    router.get('/', async (request, response) => {
        console.log("lukta snutt")
        const { districts, sort, order } = request.query;
        let filterOptions = {};
        let sortOptions = {};

        if (districts) {
            // Ensure districts is an array and filter out null or empty string values
            const filteredDistricts = [].concat(districts).filter(district => district && district.trim() !== '');
            if (filteredDistricts.length > 0) {
                filterOptions.district = { $in: filteredDistricts };
            }
        }

        // Sorting logic
        if (sort === 'name') {
            sortOptions.name = order === 'desc' ? -1 : 1;
        } else if (sort === 'rating') {
            sortOptions.rating = order === 'desc' ? -1 : 1;
        }

        try {
            const venues = await Venue.fetchAllVenues(filterOptions, sortOptions); // Adjust to pass sortOptions
            var allDistricts = await Venue.fetchDistinctDistricts();
            allDistricts = allDistricts.filter(district => district && district.trim() !== '');
            response.render('venues', { venues, allDistricts, currentSort: sort, sortOrder: order });
        } catch (error) {
            console.error('Error fetching venues:', error);
            response.status(500).send('Error fetching venues');
        }
    });

    router.post('/delete', async (request, response) => {
        console.log("lukta ännu mer snutt")
        try {
          const { name, url, district,rating } = request.body;
          // Remove the venue from MongoDB using Mongoose
          await Venue.deleteVenue(name,url,district,rating);
          //response.sendStatus(200); Send a success response
          response.redirect('/venues')
        } catch (error) {
          console.error('Error removing venue:', error);
          response.status(500).send('Internal Server Error'); // Send an error response
          response.redirect('/venues')
        }
    });

    router.get('/update/:_id', async (request, response) => {
        console.log("Received _id:", request.params._id); // Debugging
        const venue = await Venue.getVenueByID(request.params._id);
        response.render('venues-update.hbs',venue)
    });
      

    router.post('/update/:_id', async (request, response) => {
        try {
            const {_id} = await Venue.getVenueByID(request.params._id)
          const {name,url,district,rating } = request.body;

          const document = {
            _id,
            name,
            url,
            district,
            rating
        };

         
         
         await Venue.updateVenue(document);
         


          // Render the template with the updated venue data
          response.redirect('/venues');
        } catch (error) {
          console.error('Error removing venue:', error);
          //response.status(500).send('Internal Server Error'); // Send an error response
          response.redirect('/venues')
        }
    });
return router;
};
