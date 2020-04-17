const crypto = require('crypto');
const connection = require('../database/connection');

async function encript(text=''){
    var mykey = crypto.createCipher('aes-128-cbc', 'ienide');
    var mypass = mykey.update(text, 'utf8', 'hex')
    mypass += mykey.final('hex');
    return mypass;
}

async function decript(text=''){
    var mykey = crypto.createDecipher('aes-128-cbc', 'ienide');
    var mypass = mykey.update(text, 'hex', 'utf8')
    mypass += mykey.final('utf8');
    return mypass;
}

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('usuarios').count();

        const usuarios = await connection('usuarios')
        .limit(5)
        .offset((page - 1) * 5)    
        .select('*');

        response.header('X-Total-Count', count['count(*)']);
    
        return response.json(usuarios);
    },
    
    async create(request, response){
        const { name, login, password } = request.body;

        var pass = await encript(password);
        
        const [id] = await connection('usuarios').insert({
            name, 
            login,
            password: pass
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const token = request.headers.authorization;
        
        const session = await connection('sessions')
            .where('token',token)
            .select('token')
            .first();

        if (session.token !== token){
            return response.status(401).json({ error: 'Operação negada!'});
        }

        await connection('usuarios').where('id', id).delete();

        return response.status(204).send();
    }
}