const mongoose = require('mongoose');
const fs = require('fs');


// Anslut till din MongoDB-databas

//mongoose.connect('mongodb://localhost/jkpgcitydb');
const AtlasConnection = 'mongodb+srv://jkpgcitydb:jkpgcitydb4321@cluster0.1xjsgtk.mongodb.net/jkpgcity';
mongoose.connect(AtlasConnection)
// Skapa en Mongoose-modell för din samling
const Venues = mongoose.model('Venues', { name: String, url: String, district: String, rating: Number });


//spara och decoda 
const jsonData = JSON.parse(fs.readFileSync('/Users/pelli/Documents/GitHub/JKPGCity/stores.json', 'utf8'));


//filtrera och fylla ut data då vissa butiker inte har en url eller något annat så att de fortfarande blir insertade i dbn
const FilteredData = jsonData.map(({ name, url, district, rating }) => ({
    name,
    url: url || null, // Lämna ut om null, eller ersätt med ett standardvärde
    district: district || null, 
    rating: rating || null
  }));
  

//sätter in data
Venues.insertMany(FilteredData)
.then(() => {
  console.log('Data är nu i databasen.');
  mongoose.connection.close();
})
.catch(err => {
  console.error('Fel o köra in data:', err);
  mongoose.connection.close();
});

// häntar/displayar data
Venues.find({})
    .then(venues =>{
        console.log(venues);
    })
    .catch(err => {
        console.error(err);
    })
 
