const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('menus').count();

        const menus = await connection('menus')
        .limit(10)
        .offset((page - 1) * 10)    
        .select('*');

        response.header('X-Total-Count', count['count(*)']);
        const menus = await connection('menus').select('*');
    
        return response.json(menus);
    },
    
    async create(request, response){
        const { descricao, link, icone, tipo, menu_id } = request.body;
        
        const [id] = await connection('menus').insert({
            descricao, 
            link, 
            icone, 
            tipo, 
            menu_id
        });

        return response.json({ id });
    }
}