const express = require('express');
const Venue = require('../../venuesService');
const fetch = require('node-fetch');

module.exports = function({}){
    const router = express.Router();

    // router.get('/', async (request, response) => {
    //     const { districts, sort, order } = request.query;
    //     let filterOptions = {};
    //     let sortOptions = {};

    //     if (districts) {
    //         // Ensure districts is an array and filter out null or empty string values
    //         const filteredDistricts = [].concat(districts).filter(district => district && district.trim() !== '');
    //         if (filteredDistricts.length > 0) {
    //             filterOptions.district = { $in: filteredDistricts };
    //         }
    //     }

    //     // Sorting logic
    //     if (sort === 'name') {
    //         sortOptions.name = order === 'desc' ? -1 : 1;
    //     } else if (sort === 'rating') {
    //         sortOptions.rating = order === 'desc' ? -1 : 1;
    //     }

    //     try {
    //         const venues = await Venue.fetchAllVenues(filterOptions, sortOptions); // Adjust to pass sortOptions
    //         var allDistricts = await Venue.fetchDistinctDistricts();
    //         allDistricts = allDistricts.filter(district => district && district.trim() !== '');
    //         response.render('venues', { venues, allDistricts, currentSort: sort, sortOrder: order });
    //     } catch (error) {
    //         console.error('Error fetching venues:', error);
    //         response.status(500).send('Error fetching venues');
    //     }
    // });

    router.get('/', async (request, response) => {
        try {
            const apiResponse = await fetch("http://localhost:5001/api/venues");
            const venues = await apiResponse.json();
    
            response.render('venuesPage', { venues });
        } catch (error) {
            console.error("Error fetching venues: ", error);
            response.status(500).send("Error fetching venues");
        }
    });
    

    return router;
};
