const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'projeto'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

// Rotas de exemplo

// Cadastro de usuário
app.post('/api/usuarios', (req, res) => {
  const { nome, email, senha } = req.body;
  db.query(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, senha],
    (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
      res.json({ sucesso: true, id: result.insertId });
    }
  );
});

// Login de usuário
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  db.query(
    'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
    [email, senha],
    (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao buscar usuário.' });
      if (results.length === 0) return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
      res.json(results[0]);
    }
  );
});

// Listar rotinas do usuário
app.get('/api/rotinas/:usuario_id', (req, res) => {
  db.query(
    'SELECT * FROM rotinas WHERE usuario_id = ?',
    [req.params.usuario_id],
    (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao buscar rotinas.' });
      res.json(results);
    }
  );
});

// Criar rotina
app.post('/api/rotinas', (req, res) => {
  const { usuario_id, nome, meta, tipo } = req.body;
  db.query(
    'INSERT INTO rotinas (usuario_id, nome, meta, tipo) VALUES (?, ?, ?, ?)',
    [usuario_id, nome, meta, tipo],
    (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao criar rotina.' });
      res.json({ sucesso: true, id: result.insertId });
    }
  );
});

// Inicie o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});