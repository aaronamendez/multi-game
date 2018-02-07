const express = require('express');
const app = express();


// GET '/'
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

// use files within the public folder
app.use('/public', express.static(__dirname + '/public'));

// server listen on localhost:3000
app.listen(3000, () => console.log('Server is now running ...'));