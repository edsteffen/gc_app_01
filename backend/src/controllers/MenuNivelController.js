const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        try{
            const { nivelacesso = 0, menu = 0 } = request.query;
            
            if ((nivelacesso>0)||(menu>0)){
                if (nivelacesso>0) { 
                    const menus_niveis = await connection('menus_niveis')
                        .join('menus','menus_niveis.menu_id','menus.id')
                        .join('niveisacesso','menus_niveis.nivelacesso_id','niveisacesso.id')
                        .where('menus_niveis.nivelacesso_id',nivelacesso)
                        .select('menus_niveis.*','niveisacesso.descricao as nivel','menus.descricao','menus.link','menus.icone')
                        .orderBy('menus_niveis.ordem');
                    return response.json(menus_niveis);
                } else {
                    const menus_niveis = await connection('menus_niveis')
                        .join('menus','menus_niveis.menu_id','menus.id')
                        .join('niveisacesso','menus_niveis.nivelacesso_id','niveisacesso.id')
                        .where('menus_niveis.menu_id',menu)
                        .select('menus_niveis.*','niveisacesso.descricao as nivel','menus.descricao','menus.link','menus.icone')
                        .orderBy('menus_niveis.ordem');
                    return response.json(menus_niveis);
                }
                
            } else {
                const menus_niveis = await connection('menus_niveis')
                    .join('menus','menus_niveis.menu_id','menus.id')
                    .join('niveisacesso','menus_niveis.nivelacesso_id','niveisacesso.id')
                    .select('menus_niveis.*','niveisacesso.descricao as nivel','menus.descricao','menus.link','menus.icone')
                    .orderBy('menus_niveis.ordem');
                return response.json(menus_niveis);
            }
        } catch (e) {
            return response.status(400).json({ error: 'Problemas ao Listar!', msg:e });
        }
    },
    
    async create(request, response){
        try {
            const { nivelacesso_id, menu_id, ordem } = request.body;
            
            const [id] = await connection('menus_niveis').insert({nivelacesso_id, menu_id, ordem });
    
            return response.json({ id });
        } catch (e) {
            return response.status(400).json({ error: 'Problemas ao Inserir!', msg:e.code });
        }
    },

    async delete(request, response){
        try{
            const { nivelacesso = 0, menu = 0 } = request.query;
            if ((nivelacesso>0)||(menu>0)){
                if (nivelacesso>0) { 
                    await connection('menus_niveis').where('nivelacesso_id', nivelacesso).delete();
                    return response.status(204).send();
                } else {
                    await connection('menus_niveis').where('menu_id', menu).delete();
                    return response.status(204).send();
                }
            } else { return response.status(400).json({ error: 'Problemas ao Deletar!' }); }
        }catch (e){
            return response.status(400).json({ error: 'Problemas ao Deletar!', msg:e.code });
        }
    }
}