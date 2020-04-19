const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('niveisacesso').count();

        const niveisacesso = await connection('niveisacesso')
        .limit(10)
        .offset((page - 1) * 10)    
        .select('*');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(niveisacesso);
    },

    async create(request, response){
        const { descricao } = request.body;

        const [id] = await connection('niveisacesso').insert({descricao});

        return response.json({ id });
    },

    async update(request, response){
        const { descricao } = request.body;
        const { id } = request.params;
        await connection('niveisacesso')
            .where('id', id)
            .update({descricao});

        return response.status(204).send();
    },

    async delete(request, response){
        const { id } = request.params;

        await connection('niveisacesso').where('id', id).delete();

        return response.status(204).send();
    }
}