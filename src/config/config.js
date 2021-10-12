const dotenv = require('dotenv').config();

module.exports = {
  development: {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "postgres"
  },
  test: {
    "username": process.env.DB_USER_TEST,
    "password": process.env.DB_PASSWORD_TEST,
    "database": process.env.DB_NAME_TEST,
    "host": process.env.DB_HOST_TEST,
    "port": process.env.DB_PORT_TEST,
    "dialect": "postgres"
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
}  
}
