const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [clientes] = await pool.query(
      'SELECT id, nome, cidade, nivel, atualizacao FROM clientes ORDER BY id DESC'
    );

    return res.render('index', {
      clientes,
      mensagemErro: null,
      sucesso: req.query.sucesso ? 'Cliente cadastrado com sucesso.' : null
    });
  } catch (error) {
    return res.status(500).render('index', {
      clientes: [],
      mensagemErro: 'Não foi possível carregar os clientes. Verifique a conexão com o banco.',
      sucesso: null
    });
  }
});

router.post('/clientes', async (req, res) => {
  const { nome, cidade, nivel, atualizacao } = req.body;

  if (!nome || !cidade || !nivel || !atualizacao) {
    try {
      const [clientes] = await pool.query(
        'SELECT id, nome, cidade, nivel, atualizacao FROM clientes ORDER BY id DESC'
      );

      return res.status(400).render('index', {
        clientes,
        mensagemErro: 'Preencha todos os campos: nome, cidade, nível e atualização.',
        sucesso: null
      });
    } catch (error) {
      return res.status(500).render('index', {
        clientes: [],
        mensagemErro: 'Erro ao validar os campos e consultar o banco.',
        sucesso: null
      });
    }
  }

  try {
    await pool.query(
      'INSERT INTO clientes (nome, cidade, nivel, atualizacao) VALUES (?, ?, ?, ?)',
      [nome, cidade, nivel, atualizacao]
    );

    return res.redirect('/?sucesso=1');
  } catch (error) {
    try {
      const [clientes] = await pool.query(
        'SELECT id, nome, cidade, nivel, atualizacao FROM clientes ORDER BY id DESC'
      );

      return res.status(500).render('index', {
        clientes,
        mensagemErro: 'Não foi possível salvar o cliente. Verifique o banco e tente novamente.',
        sucesso: null
      });
    } catch (loadError) {
      return res.status(500).render('index', {
        clientes: [],
        mensagemErro: 'Erro crítico ao salvar e recarregar os dados.',
        sucesso: null
      });
    }
  }
});

module.exports = router;
