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
    }
}