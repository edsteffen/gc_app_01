require('dotenv').config();

module.exports = {

  development: {
    client: 'mysql',
    version: '5.7',
    connection: {
      host : process.env.DEV_HOST,
      user : process.env.DEV_USER,
      password : process.env.DEV_PSW,
      database : process.env.DEV_DATABASE
    },
    migrations: {
      directory: './src/migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};