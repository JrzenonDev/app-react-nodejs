const connection = require('../database/connection');

module.exports = {

  async index(request, response) {

    const { page = 1 } = request.query;

    // [count] pega a primeira posição do array
    const [count] = await connection('incidents').count();

    const incident = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5) // paginação para pegar de cinco em cinco
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);


    response.header('X-Total-Count', count['count(*)']);

    return response.json(incident);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    // [id], desestruturação para pegar o primeiro valor e armazenar em id.
    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return response.json({ id })
  },

  async delete(request, response) {
    const { id } = request.params; // pega o id por (params route)
    const ong_id = request.headers.authorization; // pega pelo (headers authorization)

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if(incident.ong_id != ong_id) {
      return response.status(401).json({ error: 'Oparation not permitted.' });
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();

  }
}