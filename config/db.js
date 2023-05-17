const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// pool.getConnection((error, connection) => {
//   if (error) {
//     throw new Error("Erro ao conectar ao banco de dados: " + error.message);
//   } else {
//     console.log("Conexão com o banco de dados estabelecida com sucesso");
//   }
// });

// process.on("SIGINT", () => {
//   console.log("Fechando pool de conexões");
//   pool.end(() => {
//     console.log("Pool de conexões fechado");
//     process.exit(0);
//   });
// });

module.exports = pool;
