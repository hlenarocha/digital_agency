const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

// middleware para analisar o corpo das requisições
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

// middleware para permitir requisições CORS
app.use(cors());
/*
// rota para lidar com o envio do formulário pelo terminal
app.post('/submit', (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;
  console.log(`Nome: ${nome}`);
  console.log(`Email: ${email}`);
  console.log(`Telefone: ${telefone}`);
  console.log(`Mensagem: ${mensagem}`);
  res.send('Formulário enviado com sucesso!')
}); */


// Configuração da conexão com o BD
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'YOUR_PASSWORD',
  database: 'agencia_mensagens'
});

// Estabelece a conexão com o BD
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ', err);
  } else {
    console.log("Conexão com o banco de dados MySQL estabelecida com sucesso!");
  }
});

// CREATE - Rota para lidar com o envio do formulário 
app.post('/submit', (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;

  const sql = 'INSERT INTO mensagens (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)';

  connection.query(sql, [nome, email, telefone, mensagem], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados: ', err);
      res.status(500).send("Erro ao enviar formulário.");
    } else {
      console.log("Dados inseridos com sucesso no banco de dados: ", result);
      res.send("Formulário enviado com sucesso!");
    }
  });
})

// READ - Rota para obter todas as mensagens
app.get('/messages', (req, res) => {
  const sql = 'SELECT * FROM mensagens';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar no banco de dados: ', err);
      res.status(500).send("Erro ao buscar mensagens.");
    } else {
      res.json(results);
    }
  });
});

// READ - Rota para obter uma mensagem específica por ID (primary key)
app.get('/messages/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM mensagens WHERE id = ?";

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar no banco de dados ", err);
      res.status(500).send("Erro ao buscar mensagem.");
    } else if (result.length === 0) {
      res.status(404).send("Mensagem não encontrada.");
    } else {
      res.json(result[0]);
    }
  });
});

// UPDATE - Rota para atualizar uma mensagem
app.put('/messages/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, mensagem } = req.body;
  const sql = 'UPDATE mensagens SET nome = ?, email = ?, telefone = ?, mensagem = ? WHERE id = ?';

  connection.query(sql, [nome, email, telefone, mensagem, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar dados no banco de dados: ", err);
      res.status(500).send("Erro ao atualizar mensagem.");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Mensagem não encontrada.");
    } else {
      res.send("Mensagem atualizada com sucesso!");
    }
  });
});

// DELETE - Rota para deletar uma mensagem
app.delete('/messages/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM mensagens WHERE id = ?';

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar dados no banco de dados: ', err);
      res.status(500).send("Erro ao deletar mensagem");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Mensagem não encontrada.");
    } else {
      res.send("Mensagem deletada com sucesso!")
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http/localhost:${port}`);
}); 

