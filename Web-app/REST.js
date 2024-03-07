const express = require('express')
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken")
const homepageRouter = require('./Presentation/Routers/homepage-router')


//module.exports = function ({ accountManager,homepageRouter}) {

    const router = express.Router()
    router.use(bodyParser.json())
    router.use(express.urlencoded({
        extended: false,
    }))
    const app = express

    app.use('/', homepageRouter)
    

    app.engine('hbs', expressHandlebars.engine({
        extname: 'hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: path.join(__dirname, 'layouts')
    }))
    
    router.get("/",function (request, response){
        response.render('homepage.hbs')
    })

    app.listen(5001, function () {
        console.log("Running on port 5001!")
    })

    router.post("/Skapa-konto", function (request, response) {

        const newAccount = {
            username: request.body.username,
            password: request.body.password,
            isAdmin: request.body.isAdmin
        }

        accountManager.createAccount(newAccount, function(errors, account) {
            if (errors.length > 0) {
                response.status(400).json(errors)
            } else {
                response.setHeader("Location", "/" + account)
                response.status(201).json("account was created")
            }
        })
    })
    //return router
//}

