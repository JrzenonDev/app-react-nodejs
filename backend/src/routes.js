const express = require('express');
const crypto = require('crypto');
const connection = require('./database/connection');

const routes = express.Router();

routes.get('/ongs', async(request, response) => {
  const ongs = await connection('ongs').select('*');

  return response.json(ongs);
});

routes.post('/ongs', async(request, response) => {

  const { name, email, whatsapp, city, uf } = request.body;

  // gera um valor de 4bites em hexadecimal para o id para ser aleatório
  const id = crypto.randomBytes(4).toString('HEX');

  // conexão com bd
  await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf,
  })

  return response.json({ id });
});

module.exports = routes;