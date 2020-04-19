const connection = require('../database/connection');
const security = require('./SecurityController');


module.exports = {
    async index(request, response) {
        try{
            const { page = 1 } = request.query;
        
            const [count] = await connection('usuarios').count();
    
            const usuarios = await connection('usuarios')
            .limit(10)
            .offset((page - 1) * 10)    
            .select('*');
    
            response.header('X-Total-Count', count['count(*)']);

            return response.json(usuarios);
        } catch (e) {
            return response.status(400).json({ error: 'Problemas ao Listar!', msg:e.code });
        }
    },
    
    async create(request, response){
        try {
            const { nome, email, login, senha, nivel_id, foto, per_ler, per_salvar, per_atualizar, per_deletar } = request.body;

            var pass = await security.encript(senha);
            
            const [id] = await connection('usuarios').insert({
                nome, email, login, 
                senha: pass, 
                nivel_id, foto, 
                per_ler, per_salvar, per_atualizar, per_deletar
            });
    
            return response.json({ id });
        } catch (e) {
            return response.status(400).json({ error: 'Problemas ao Inserir!', msg:e.code });
        }
    },

    async update(request, response){
        try{
            const { nome, email, login, senha, nivel_id, foto, per_ler, per_salvar, per_atualizar, per_deletar } = request.body;
            const { id } = request.params;
            await connection('usuarios')
                .where('id', id)
                .update({nome, email, login, senha, nivel_id, foto, per_ler, per_salvar, per_atualizar, per_deletar});
    
            return response.status(204).send();
        } catch (e){
            return response.status(400).json({ error: 'Problemas ao Atualizar!', msg:e.code });
        }
    },

    async delete(request, response){
        try{
            const { id } = request.params;
            await connection('usuarios').where('id', id).delete();
            return response.status(204).send();
        }catch (e){
            return response.status(400).json({ error: 'Problemas ao Deletar!', msg:e.code });
        }
    }
}