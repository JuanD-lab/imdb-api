const dotenv = require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DEV_DATABASE_URL',
},
test: {
    use_env_variable: 'TEST_DATABASE_URL',
},
  "production": {
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  }  
}

/* "development": {
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "host": "127.0.0.1",
  "dialect": "postgres"
}, */