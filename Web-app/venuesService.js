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

async function createVenue(document) {
  try {
    const venue = await Venue.create({ name: document.name, url: document.url, district: document.district, rating: document.rating })
    return venue;
  } catch (error) {
    console.error("error", error)
    throw error;
  }
}
async function deleteVenue(document) {
  try {
    const venue = await Venue.deleteOne({document})
    return venue;
  } catch (error) {
    console.error("error", error)
    throw error;
  }
}

async function updateVenue(document) {
  console.log("Received document:", document._id,document.name,document.url,document.district,document.rating);

    // Check if 'document' is defined and contains the necessary properties
    if (!document || !document.name || !document.url || !document.district || !document.rating) {
      throw new Error("Invalid document object or missing properties");
    }

  const newData = {
    _id: document._id,
    name: document.name,
    url: document.url,
    district: document.district,
    rating: document.rating
};

  try {
    const venue = await Venue.updateOne({_id: document._id },{ $set: newData });
    return venue;
  } catch (error) {
    console.error("error", error)
    throw error;
  }
}

async function getVenueByID(_id){
  try{
    const venue = await Venue.findById(_id)
    return venue;
  } catch(error){
    console.error('error',error)
    throw error
  }
}



module.exports = {
  fetchAllVenues,
  fetchDistinctDistricts,
  createVenue,
  deleteVenue,
  updateVenue,
  getVenueByID
};
