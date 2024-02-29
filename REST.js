const express = require('express')
const app = express()
const port = 30100

var data = require("./stores.json")
console.log(data)

app.get('/', (req,res,next) =>(
console.log(data),
console.log('rov')
))

app.get('/venues',(req,res,next) =>(
console.log('affärer')
))

app.get('/restaurants',(req,res,next) =>(
console.log('restauranger')
))

app.get('/info',(req,res,next) => (
console.log('info')
))

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// adress till sida http://192.168.49.2:30100

