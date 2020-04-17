const crypto = require('crypto');
require('dotenv').config();

module.exports = {
    async encript(text=''){
        var mykey = crypto.createCipher(process.env.KEY_ALGORITHM, process.env.KEY_PSW);
        var mypass = mykey.update(text, 'utf8', 'hex')
        mypass += mykey.final('hex');
        return mypass;
        
    },

    async decript(text=''){
        var mykey = crypto.createDecipher(process.env.KEY_ALGORITHM, process.env.KEY_PSW);
        var mypass = mykey.update(text, 'hex', 'utf8')
        mypass += mykey.final('utf8');
        return mypass;
    }
}