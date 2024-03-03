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
//Venues.insertMany(FilteredData)
//.then(() => {
// console.log('Data är nu i databasen.');
// mongoose.connection.close();
//})
//.catch(err => {
// console.error('Fel o köra in data:', err);
//mongoose.connection.close();
//});




//________________________CREATE,READ,UPDATE,DELETE QUERIES FOR THE VENUES______________________

module.exports = async function ({ Database }) {
  return {

    getVenue: async function (document, callback) {
      try {
        mongoose.connection.on('open',() =>{
        await Venues.find({ name: document.name, url: document.url, district: document.district, rating: document.rating })
        mongoose.connection.close();
        });
      }
      catch {
        callback(['HasDBError'], null)
        mongoose.connection.close();
      }
    },

    addVenue: async function (document, callback) {
      try {
        mongoose.connection.on('open', () => {
        await Venues.insertOne({ name: document.name, url: document.url, district: document.district, rating: document.rating })
        mongoose.connection.close();
        });
      } 
      catch {
        callback(['HasDBError'], null)
        mongoose.connection.close();
      }
    },

    deleteVenue: async function (document, callback) {
      try {
        mongoose.connection.on('open', () => {
        await Venues.deleteOne({ name: document.name, url: document.url, district: document.district, rating: document.rating })
        mongoose.connection.close();
        });
      }
      catch {
        callback(['HasDBError'], null)
        mongoose.connection.close();
      }
    },

    updateVenue: async function (document, callback) {
      try {
        mongoose.connection.on('open', () => {
        await Venues.updateOne({ name: document.name, url: document.url, district: document.district, rating: document.rating })
        mongoose.connection.close();
        });
      } 
      catch {
        callback(['HasDBError'], null)
        mongoose.connection.close();
      }
    },

    //_________________________SORTING QUERIES FOR THE VENUES________________________
    SortVenueByDistrict: async function ({ document, callback }) {
      try {
        if (document.district === 'Öster') {
          mongoose.connection.on('open', () => {
          await Venues.find({ district: 'Öster' })
            .then(venues => {
              console.log(venues);
              mongoose.connection.close();
            })
          })
        }

        if (document.district === 'Väster') {
          mongoose.connection.on('open', () => {
          await Venues.find({ district: 'Väster' })
            .then(venues => {
              console.log(venues);
              mongoose.connection.close();
            })
          })
        }

        if (document.district === 'Atollen') {
          mongoose.connection.on('open', () => {
          await Venues.find({ district: 'Atollen' })
            .then(venues => {
              console.log(venues);
              mongoose.connection.close();
            })
          })
        }

        if (document.district === 'Tändsticksområdet') {
          mongoose.connection.on('open', () => {
          await Venues.find({ district: 'Tändsticksområdet' })
            .then(venues => {
              console.log(venues);
              mongoose.connection.close();
            })
          })
        }

        if (document.district === 'Rescentrum') {
          mongoose.connection.on('open', () => {
          await Venues.find({ district: 'Resecentrum' })
            .then(venues => {
              console.log(venues);
              mongoose.connection.close();
            })
          })
        }
        
        else mongoose.connection.on('open', () => {
          ( Venues.find({}) )
        mongoose.connection.close();
        })
      } catch {
        callback(['HasDbError'], null)
        mongoose.connection.close();
      }
    },


    ShowVenues: async function ({ }) {
      try {
        await Venues.find({})
          .then(venues => {
            console.log(venues);
          })
          .catch(err => {
            console.error(err);
          })
      } catch {
        callback(['hasDBError'], null)
      }
    }
  }
}
