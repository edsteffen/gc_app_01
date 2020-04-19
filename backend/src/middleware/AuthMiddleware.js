const security = require('../controllers/SecurityController');
require('dotenv').config();

module.exports = {
    async auth_login(request, response, next) {
        try {
            let token = request.headers.authorization;
            let key = await security.decript(token);
            let arr = key.split('-');
            if (arr.length>0){
                const num = Number.parseInt(arr[1]);
                if (Number.isNaN(num)) { return response.status(401).json({ error: 'Acesso não Autorizado!.' }); }
                next();
            } else {
                return response.status(401).json({ error: 'Acesso não Autorizado!' }); 
            }
        } catch {
            return response.status(400).json({ error: 'Acesso não Autorizado!' });
        }
    },
    async auth_index(request, response, next) {
        try {
            let token = request.headers.authorization;
            let key = await security.decript(token);
            let arr = key.split('-');
            if (arr.length>0){
                const num = Number.parseInt(arr[1]);
                if (Number.isNaN(num)) { return response.status(401).json({ error: 'Acesso não Autorizado!.' }); }
                else if (arr[2]==process.env.KEY_INDEX) { next(); }
                else { return response.status(401).json({ error: 'Sem permissão para Listar dados!' }); }
            } else {
                return response.status(401).json({ error: 'Sem permissão para Listar dados!' }); 
            }
        } catch {
            return response.status(400).json({ error: 'Acesso não Autorizado!' });
        }
    },
    async auth_create(request, response, next) {
        try {
            let token = request.headers.authorization;
            let key = await security.decript(token);
            let arr = key.split('-');
            if (arr.length>0){
                const num = Number.parseInt(arr[1]);
                if (Number.isNaN(num)) { return response.status(401).json({ error: 'Acesso não Autorizado!.' }); }
                else if (arr[3]==process.env.KEY_CREATE) { next(); }
                else { return response.status(401).json({ error: 'Sem permissão para Salvar dados!' }); }
            } else {
                return response.status(401).json({ error: 'Sem permissão para Salvar dados!' }); 
            }
        } catch {
            return response.status(400).json({ error: 'Acesso não Autorizado!' });
        }
    },
    async auth_update(request, response, next) {
        try {
            let token = request.headers.authorization;
            let key = await security.decript(token);
            let arr = key.split('-');
            if (arr.length>0){
                const num = Number.parseInt(arr[1]);
                if (Number.isNaN(num)) { return response.status(401).json({ error: 'Acesso não Autorizado!.' }); }
                else if (arr[4]==process.env.KEY_UPDATE) { next(); }
                else { return response.status(401).json({ error: 'Sem permissão para Atualizar dados!' }); }
            } else {
                return response.status(401).json({ error: 'Sem permissão para Atualizar dados!' }); 
            }
        } catch {
            return response.status(400).json({ error: 'Acesso não Autorizado!' });
        }
    },
    async auth_delete(request, response, next) {
        try {
            let token = request.headers.authorization;
            let key = await security.decript(token);
            let arr = key.split('-');
            if (arr.length>0){
                const num = Number.parseInt(arr[1]);
                if (Number.isNaN(num)) { return response.status(401).json({ error: 'Acesso não Autorizado!.' }); }
                else if (arr[5]==process.env.KEY_DELETE) { next(); }
                else { return response.status(401).json({ error: 'Sem permissão para Deletar dados!' }); }
            } else {
                return response.status(401).json({ error: 'Sem permissão para Deletar dados!' }); 
            }
        } catch {
            return response.status(400).json({ error: 'Acesso não Autorizado!' });
        }
    }
}