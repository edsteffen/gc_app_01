const connection = require('../database/connection');
const security = require('./SecurityController');

module.exports = {
    async test(request, response){
        const { login, psw } = request.body;

        console.log(psw);
        console.log(security.encript(psw));
        var chave = '';
        if (login == 'E') {
            chave = await security.encript(psw);
            return response.json({chave});
        } else {
            chave = await security.decript(psw);
            return response.json({ chave });
        }
    },
    async login(request, response){
        try{
            const { login, psw } = request.body;
            const psw_u = await security.encript(psw);
            const {id,senha,per_ler,per_salvar,per_atualizar,per_deletar} = await connection('usuarios')
                .where('login',login)
                .select('id','senha','per_ler','per_salvar','per_atualizar','per_deletar')
                .first();
            if (Number.isInteger(id)) {
                if (senha===psw_u) {
                    let skey = Date.now() + '-' + id + '-' + per_ler + '-' + per_salvar + '-' + per_atualizar + '-' + per_deletar;
                    let token = await security.encript(skey);
                    response.header('Authorization', token);
                    return response.status(204).send();
                } 
                else { return response.status(401).json({ error: 'Usuário ou Senha inválidos!'}); }
            } else {
                return response.status(401).json({ error: 'Login não Autorizado!'});
            }
        } catch (e) {
            return response.status(400).json({ error: 'Problemas no Login...!', msg:e });
        }
    }
}