const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const pool = require("./config/db");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let tasks = [
  { id: 1, title: "Fazer compras", completed: false },
  { id: 2, title: "Pagar conta de luz", completed: true },
  { id: 3, title: "Estudar JavaScript", completed: false },
];

app.all("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // permite que a API seja acessada de qualquer origem
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // permite que todos os métodos HTTP sejam usados nesta rota
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // permite que esses cabeçalhos sejam usados na solicitação
  next(); // chama o próximo middleware na cadeia de middlewares do Express
});

app.all("/", (req, res) => {
  res.send("API RESTful Gerenciamento de Tarefas");
});

// Obter todas as tarefas
app.get("/tasks", async (req, res) => {
  // Use a conexão com o banco de dados para obter as tarefas
  await pool.getConnection((error, connection) => {
    if (error) {
      throw new Error("Erro ao conectar ao banco de dados: " + error.message);
    } else {
      console.log("Conexão com o banco de dados estabelecida com sucesso");
    }
    connection.query("SELECT * FROM tasks", (err, rows) => {
      if (err) {
        console.error("Erro ao obter as tarefas:", err);
        res.status(500).send({ error: "Erro ao obter as tarefas" });
      } else {
        res.send(rows);
      }
      connection.release();
    });
  });
});

// rota para criar uma tarefa
app.post("/tasks", async (req, res) => {
  const { title, completed } = req.body;
  await pool.getConnection((error, connection) => {
    if (error) {
      throw new Error("Erro ao conectar ao banco de dados: " + error.message);
    } else {
      console.log("Conexão com o banco de dados estabelecida com sucesso");
    }

    connection.query(
      "INSERT INTO tasks (title, completed) VALUES (?, ?)",
      [title, completed],
      (err, rows) => {
        if (err) {
          console.log("Erro ao inserir nova tarefa!", err);
          res.status(500).send({ error: "Erro ao inserir nova tarefa." });
        } else {
          res.status(201).send("Nova tarefa atribuida.");
        }
        connection.release();
      }
    );
  });
});

// Restante do código da API...

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
