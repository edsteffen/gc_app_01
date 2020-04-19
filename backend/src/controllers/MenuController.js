const connection = require('../database/connection');

module.exports = {
    async index(request, response, next) {
        const { page = 1 } = request.query;

        const [count] = await connection('menus').count();

        const menus = await connection('menus')
        .limit(10)
        .offset((page - 1) * 10)    
        .select('*');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(menus);
    },

    async create(request, response){
        const { descricao, link, icone, tipo, menu_id } = request.body;

        const [id] = await connection('menus')
            .insert({descricao, link, icone, tipo, menu_id});

        return response.json({ id });
    },

    async update(request, response){
        const { descricao, link, icone, tipo, menu_id } = request.body;
        const { id } = request.params;
        await connection('menus')
            .where('id', id)
            .update({descricao, link, icone, tipo, menu_id});

        return response.status(204).send();
    },

    async delete(request, response, next){
        const { id } = request.params;
        const token = request.headers.authorization;

        /*if (session.token !== token){
            return response.status(401).json({ error: 'Operação negada!'});
        }*/

        await connection('menus').where('id', id).delete();

        return response.status(204).send();
    }
}