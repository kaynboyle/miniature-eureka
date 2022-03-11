const express = require('express');

const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.json()); // this allows the server to accept json
app.use(express.urlencoded({ extended: true})); // this allows the server to accept strings and arrays

// configure the server to share public assets
app.use(express.static('public'));

app.use(require('./routes/apiRoutes.js'));
app.use(require('./routes/htmlRoutes.js'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));