const awilix = require('awilix')
const app = require("./theApp")

const container = awilix.createContainer()

container.register("homepageRouter", awilix.asFunction(require('./Presentation/Routers/homepage-router.js')))
container.register("venuesRouter", awilix.asFunction(require('./Presentation/Routers/venues-router.js')))
container.register("app", awilix.asFunction(app))

//resolve the dependencies and run the app
const theApp = container.resolve("app")

theApp.start()