const express = require('express');
const app = express();


const { banco, contas } = require('../src/bancodedados');

const autenticacaoBanco = (req, res, next) => {
    const senha_banco = req.query.senha_banco;
    if (!senha_banco) {
        return res.status(401).json({mensagem: 'Senha Obrigatória!'})
    }
    
    if (senha_banco === banco.senha){
        next()
    } else {
        return res.status(401).json({mensagem: 'Senha Incorreta'})
    }
};

const verificarDadosUnicos = (req, res, next) => {
    const { cpf, email } = req.body;
    const emailExistente = contas.find((conta) => {
        return conta.usuario.email === email 
    });
    const cpfExistente = contas.find((conta) => {
        return conta.usuario.cpf === cpf
    }) 
    
    if (cpfExistente || emailExistente) {
        return res.status(400).json({mensagem: 'Já existe uma conta com o cpf ou e-mail informado!'})
    }

    next();
}

const autenticarConta = (req, res, next) => {
    const { numero_conta, senha } = req.body; 
    
    const contaExistente = contas.find((elemento) => {
        return elemento.numero === Number(numero_conta)
    })

    if (!contaExistente) {
        return res.status(404).json({mensagem: 'Conta não encontrada!'})
    }
    if (!senha) {
        return res.status(401).json({mensagem: 'Senha Obrigatória!'})
    }
    if (contaExistente.usuario.senha !== senha) {
        return res.status(400).json({mensagem: 'Senha Incorreta'})
    }
    next();
    
}

const autenticarUsuario = (req, res, next) => {
    const { senha, numero_conta } = req.query;

    const contaExistente = contas.find((elemento) => {
        return elemento.numero === Number(numero_conta)
    })

    if (!senha || !numero_conta) {
        return res.status(401).json({ mensagem: 'Senha, e Numero da conta são Obrigatórios!' });
    }
    if (!contaExistente) {
        return res.status(404).json({ mensagem: 'Conta não encontrada!' });
    }
    if (senha !== contaExistente.usuario.senha) {
        return res.status(400).json({ mensagem: 'Senha Incorreta' });
    }
    
    next();
}



module.exports = {
    autenticacaoBanco,
    verificarDadosUnicos,
    autenticarConta,
    autenticarUsuario
}