const express = require('express')
const app = express()
const port = 3000


app.get('/', (req,res,next) =>(
console.log('hej')
))

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});