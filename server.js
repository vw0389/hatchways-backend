const express = require('express');
const path = require('path');
const routes = require('./controllers');
const apicache = require( 'apicache');

const app = express();
const PORT = process.env.PORT || 3000;
let cache = apicache.middleware;

app.use(express.json());

app.use(express.urlencoded({extended: true}));
// Since we only have get requests, we can cache all of our requests, you cannot catch post, put, patch or delete
app.use(cache('5 minutes'));
// Use our routes
app.use(routes);
// Start application
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
//Export to it may be tested
module.exports = app;