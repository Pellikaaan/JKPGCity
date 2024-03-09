// Import Mongoose
const mongoose = require('mongoose');

// MongoDB Connection String
const dbConnectionUri = 'mongodb+srv://jkpgcitydb:jkpgcitydb4321@cluster0.1xjsgtk.mongodb.net/jkpgcity';
mongoose.connect(dbConnectionUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define the schema for the "venues" collection
const venueSchema = new mongoose.Schema({
  // Define your schema according to the structure of your documents in the "venues" collection
  name: String,
  url: String,
  district: String,
  rating: Number,
  // Add more fields as necessary
});

// Create a model from the schema
const Venue = mongoose.model('Venue', venueSchema);

async function fetchAllVenues(filterOptions = {}, sortOptions = {}) {
  try {
      const venues = await Venue.find(filterOptions).sort(sortOptions).lean();
      return venues;
  } catch (error) {
      console.error('Error fetching venues:', error);
      throw error;
  }
}


async function fetchDistinctDistricts() {
  try {
      const districts = await Venue.distinct("district");
      return districts.sort();
  } catch (error) {
      console.error('Error fetching districts:', error);
      throw error;
  }
}

module.exports = {
  fetchAllVenues,
  fetchDistinctDistricts,
};
