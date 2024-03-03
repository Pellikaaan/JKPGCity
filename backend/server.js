const express = require('express');
const cors = require('cors'); // Import the cors module
const app = express();
const fs = require('fs');

// Use the cors middleware
app.use(cors());

// Read stores.json file
const storesData = JSON.parse(fs.readFileSync('stores.json'));

// Route to serve stores data
app.get('/stores', (req, res) => {
  res.json(storesData);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
