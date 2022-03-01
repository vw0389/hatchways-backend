const express = require('express');
const path = require('path');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));