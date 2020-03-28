const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// dev
app.use(cors());

// producion
// app.use(cors({
//   origin: 'http://meuapp.com'
// }));

app.use(express.json());

app.use(routes);

/**
 * Driver: SELECT * FROM users
 * QUERY BUILDER: table('users').select(*).where()
 */


app.listen(3333);
