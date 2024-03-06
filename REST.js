const express = require('express')
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken")


module.exports = function ({ accountManager}) {

    const router = express.Router()
    router.use(bodyParser.json())
    router.use(express.urlencoded({
        extended: false,
    }))

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
    return router
}

