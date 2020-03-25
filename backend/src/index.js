const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(routes);

/**
 * Driver: SELECT * FROM users
 * QUERY BUILDER: table('users').select(*).where()
 */


app.listen(3333);
