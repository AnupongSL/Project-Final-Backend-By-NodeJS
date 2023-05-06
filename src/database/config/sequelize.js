module.exports = {
  "development": {
    "username": "kkndew123",
    "password": "111222",
    "database": "kkndew123",
    "host": "localhost",
    "port": "3306",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": "mysql"
  }
}
