const express = require('express')

const Account = require('../../venuesService');
const router = express.Router()
const bodyParser = require('body-parser')


module.exports = function ({ }) {
  const router = express.Router();
  router.use(bodyParser.json())
  router.use(express.urlencoded({
    extended: false,
  }))


  router.get('/', function (request, response) {
    response.render('login.hbs');
  })


  router.post('/', async function (request, response) {
    
    const { username, password } = request.body;
    //const { _id } = await Venue.getVenueByID(request.params._id)

    try {
      // Step 1: Check if the username exists in the database
      const existingAccount = await Account.getAccountByID(username);

      if (!existingAccount) {
        response.redirect('/venues')
      }

      // Step 2: Verify the password
      const isPasswordValid = existingAccount.password === password;
      if (!isPasswordValid) {
        response.redirect('/venues')
      }

      // Step 3: If username and password are valid, generate a JWT
      request.session.isLoggedIn = true;
      request.session.username = existingAccount.username;
      request.session.isAdmin = existingAccount.isAdmin;
      // Step 4: Send the JWT as a response
      response.redirect('/venues');
    } catch (error) {
      console.error('Error occurred:', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/createAccount', async (request, response) => {
    response.render('create-account');
  });

  router.post('/createAccount', async (request, response) => {

    try {
      console.log(request.body)
      const { username, password } = request.body;
      const {isAdmin} = true

      const document = {
        username,
        password,
        isAdmin
      }
      // Assuming you have a model for Account and you want to create a new account
       await Account.createAccount(document);
      response.send('Account created successfully!');
    } catch (error) {
      console.error('Error creating account:', error);
      response.status(500).send('Error creating account');
    }
  });

  return router;
}