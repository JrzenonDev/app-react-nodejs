const express = require('express');

const app = express();

app.use(express.json());

app.post('/users', (request, response) => {

  const body = request.body;

  console.log(body);

  return response.json({
    evento: 'Teste Hello World',
    aluno: 'José Roberto de Oliveira'
  });

});



app.listen(3333);
