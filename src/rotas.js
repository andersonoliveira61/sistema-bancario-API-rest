const express = require('express');
const rotas = express();

const { autenticacaoBanco, verificarDadosUnicos, autenticarConta, autenticarUsuario } = require('./intermediarios')
const { listarContas, cadastrarConta, atualizarUsuario, excluirConta} = require('./controladores/contas');
const { depositar, sacar, transferir } = require('./controladores/transacoes');
const { saldo, extrato } = require('./controladores/demonstrativos');

rotas.get('/contas', autenticacaoBanco, listarContas);
rotas.post('/contas', verificarDadosUnicos, cadastrarConta);
rotas.put('/contas/:numeroConta/usuario', verificarDadosUnicos, atualizarUsuario);
rotas.delete('/contas/:numeroConta/usuario', excluirConta);
rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', autenticarConta, sacar);
rotas.post('/transacoes/transferir', autenticarConta, transferir);
rotas.get('/contas/saldo', autenticarUsuario, saldo);
rotas.get('/contas/extrato', autenticarUsuario, extrato);

module.exports = rotas;