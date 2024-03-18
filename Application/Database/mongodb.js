const mongoose = require('mongoose');
const fs = require('fs');


// Anslut till din MongoDB-databas

//mongoose.connect('mongodb://localhost/jkpgcitydb');
const AtlasConnection = 'mongodb+srv://jkpgcitydb:jkpgcitydb4321@cluster0.1xjsgtk.mongodb.net/jkpgcity';
mongoose.connect(AtlasConnection)
//Mongoose-modell blir collections för din samling
const Venues = mongoose.model('Venues', { name: String, url: String, district: String, rating: Number });
const Accounts = mongoose.model('Accounts', { username: String, password: String, isAdmin: Boolean })

Accounts.insertOne
//spara och decoda 
const jsonData = JSON.parse(fs.readFileSync('/Users/pelli/Documents/GitHub/JKPGCity/stores.json', 'utf8'));


//filtrera och fylla ut data då vissa butiker inte har en url eller något annat så att de fortfarande blir insertade i dbn
const FilteredData = jsonData.map(({ name, url, district, rating }) => ({
  name,
  url: url || null, // Lämna ut om null, eller ersätt med ett standardvärde
  district: district || null,
  rating: rating || null
}));
/*console.log('ör de du som funkar?')
Venues.find({})
  .then(Venues => {
    console.log(Venues);
  })
  .catch(err => {
    console.error(err);
  })
*/
//console.log('jag vill se min databas')
//Venues.find({}).then(() => { console.log(Venues)})

//console.log('här får vi en venue')
//mongoose.connection.on('open',() =>{
//  Venues.find({ name: document.name, url: document.url, district: document.district, rating: document.rating }).then(() =>
//  {mongoose.connection.close()})},
//sätter in data
/*Venues.insertMany(FilteredData)
.then(() => {
 console.log('Data är nu i databasen.');
 mongoose.connection.close();
})
.catch(err => {
 console.error('Fel o köra in data:', err);
mongoose.connection.close();
});*/


//________________________CREATE,READ,UPDATE,DELETE QUERIES FOR THE VENUES______________________

module.exports = async function ({ Database }) {
  return {

    getVenue: function (document, callback) {
      Venues.find({ district: document.district })
        .then(venues => {
          console.log(venues)
        })
        .catch(error => {
          console.log(error)
        })
    },

    addVenue: function (document, callback) {
      Venues.insertOne({ name: document.name, url: document.url, district: document.district, rating: document.rating })
        .then(venues => {
          console.log(venues)
        })
        .catch(error => {
          console.log(error)
        })
    },

    deleteVenue: function (document, callback) {
      Venues.deleteOne({ name: document.name, url: document.url, district: document.district, rating: document.rating })
        .then(venues => {
          console.log(venues)
        })
        .catch(error => {
          console.log(error)
        })
    },

    updateVenue: function (document, callback) {
      Venues.UpdateOne({ name: document.name, url: document.url, district: document.district, rating: document.rating })
        .then(venues => {
          console.log(venues)
        })
        .catch(error => {
          console.log(error)
        })
    },

    //_________________________SORTING QUERIES FOR THE VENUES________________________
    SortVenueByDistrict: function ({ document, callback }) {
      if (document.district === 'Öster') {
        mongoose.connection.on('open', () => {
          Venues.find({ district: 'Öster' })
            .then(venues => {
              console.log(venues);
              mongoose.connection.close();
            })
        })
      }

      if (document.district === 'Väster') {
        mongoose.connection.on('open', () => {
          Venues.find({ district: 'Väster' })
            .then(venues => {
              console.log(venues);
              mongoose.connection.close();
            })
        })
      }

      if (document.district === 'Atollen') {
        mongoose.connection.on('open', () => {
          Venues.find({ district: 'Atollen' })
            .then(venues => {
              console.log(venues);
              mongoose.connection.close();
            })
        })
      }

      if (document.district === 'Tändsticksområdet') {
        mongoose.connection.on('open', () => {
          Venues.find({ district: 'Tändsticksområdet' })
            .then(venues => {
              console.log(venues);
              mongoose.connection.close();
            })
        })
      }

      if (document.district === 'Rescentrum') {
        mongoose.connection.on('open', () => {
          Venues.find({ district: 'Resecentrum' })
            .then(venues => {
              console.log(venues);
              mongoose.connection.close();
            })
        })
      }

      else mongoose.connection.on('open', () => {
        (Venues.find({}))
        mongoose.connection.close();
      })
    },

    ShowVenues: function ({ }) {
      console.log('är du här o luskar')
      try {
        Venues.find({})
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
