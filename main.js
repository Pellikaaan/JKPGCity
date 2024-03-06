const awilix = require('awilix')
const app = require("./theApp")

container.register("restApi", awilix.asFunction(require('../REST')))
container.register("app", awilix.asFunction(app))

//resolve the dependencies and run the app
const theApp = container.resolve("app")

theApp.start()