const express = require('express');
const bodyParser = require('body-parser');
const Venues = require('../venuesService');


module.exports = function({}){
    const router = express.Router();

    router.use(bodyParser.json())
    router.use(express.urlencoded({
        extended: false,
    }))

    router.use(function (request, response, next) {
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Methods", "*")
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Expose-Headers", "*")

        if (request.method == "OPTIONS") {
            return response.status(200).end()
       }

        next()
    })

    router.get('/', async (req, res) => {
        try {
          res.status(200).send("Hello World");
        } catch (error) {
          res.status(500).send(error);
        }
      });

    router.get('/venues', async (req, res) => {
        try {
          const venues = await Venues.fetchAllVenues();
          res.status(200).json(venues)
        } catch (error) {
          res.status(500).send(error);
        }
      });

    return router;
};
