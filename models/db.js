const Sequelize = require('sequelize')
// Conexão com o banco de dados MySQL
  const sequelize = new Sequelize('postapp', 'root', '123456', {
    host: "localhost",
    dialect: "mysql",
    query: {
        raw: true, // Habilita consultas SQL cruas
      },
  })

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}