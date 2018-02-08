const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3000));

// GET '/'
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

// use files within the public folder
app.use('/public', express.static(__dirname + '/public'));

// server listen on localhost:3000
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});