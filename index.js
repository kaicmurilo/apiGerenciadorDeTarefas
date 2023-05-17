const express = require("express");
const bodyParser = require("body-parser");

const app = express();
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
app.get("/tasks", (req, res) => {
  res.send(tasks);
});

// Obter uma tarefa pelo ID
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).send({ error: "Tarefa não encontrada" });
  }

  res.send(task);
});

// Criar uma nova tarefa
app.post("/tasks", (req, res) => {
  const task = req.body;

  if (!task.title) {
    return res.status(400).send({ error: "Título da tarefa é obrigatório" });
  }

  task.id = tasks.length + 1;
  task.completed = false;
  tasks.push(task);

  res.send(task);
});

// Atualizar uma tarefa existente
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).send({ error: "Tarefa não encontrada" });
  }

  task.title = req.body.title || task.title;
  task.completed = req.body.completed || task.completed;

  res.send(task);
});

// Excluir uma tarefa existente
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);

  res.send({ message: "Tarefa excluída com sucesso" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
