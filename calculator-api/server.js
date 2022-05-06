const express = require('express');
const routes = require('./src/Routes');

require('./src/Database');

const app = express();

app.use(express.json());
app.use(routes);

app.listen(12345);