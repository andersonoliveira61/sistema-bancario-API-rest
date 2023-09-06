const { contas } = require('../bancodedados');
let { numero_conta } = require('../bancodedados');


const listarContas = (req, res) => {
    res.status(200).json(contas);
}

const cadastrarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha} = req.body;
    let saldo = 0;
    const dataFormat = new Date(data_nascimento)
    if (!data_nascimento || isNaN(dataFormat.getTime())) {
        return res.status(400).json({mensagem: 'Data de nascimento inválida'})
    }
    if (!nome) {
        return res.status(400).json({mensagem: 'Nome não informado'})
    } if (!cpf || cpf.length !== 11){
        return res.status(400).json({mensagem: 'Informe o CPF corretamente'})
    } if (!telefone) {
        return res.status(400).json({mensagem: 'Telefone Não cadastrado'})
    } if (!email) {
        return res.status(400).json({mensagem: 'Email não cadastrado'})
    } if (!senha) {
        return res.status(400).json({mensagem: 'Senha não cadastrada'})
    }
    
    const novaConta = {
        numero: numero_conta++,
        saldo,
        usuario: {
            nome,
            cpf: cpf,
            data_nascimento: dataFormat,
            telefone,
            email,
            senha
        }
        
    }

    contas.push(novaConta);

    return res.status(201).send();
}

const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  
    const cliente = contas.find((conta) => conta.numero === Number(numeroConta));
  
    if (!cliente) {
      return res.status(404).json({ mensagem: 'Conta não existente' });
    }
  
    const dataFormat = new Date(data_nascimento);
    
    if (!data_nascimento || isNaN(dataFormat.getTime())) {
      return res.status(400).json({ mensagem: 'Data de nascimento inválida' });
    }
  
    if (!nome) {
      return res.status(400).json({ mensagem: 'Nome não informado' });
    }
  
    if (!cpf || cpf.length !== 11) {
      return res.status(400).json({ mensagem: 'Informe o CPF corretamente' });
    }
  
    if (!telefone) {
      return res.status(400).json({ mensagem: 'Telefone não cadastrado' });
    }
  
    if (!email) {
      return res.status(400).json({ mensagem: 'Email não cadastrado' });
    }
  
    if (!senha) {
      return res.status(400).json({ mensagem: 'Senha não cadastrada' });
    }
  
    cliente.usuario.nome = nome;
    cliente.usuario.cpf = cpf;
    cliente.usuario.telefone = telefone;
    cliente.usuario.email = email;
    cliente.usuario.senha = senha;
  
    return res.status(204).send();
  };
  

const excluirConta = (req, res) => {
    const { numeroConta } = req.params;
    const cliente = contas.find((conta) => {
        return conta.numero === Number(numeroConta)
    })
    if (!cliente) {
        return res.status(404).json({mensagem: 'Conta não existente'})
    }
    if (cliente.saldo > 0) {
        return res.status(400).json({mensagem: 'A conta só pode ser removida se o saldo for zero!'})
    }
    contas.splice(cliente, 1);
    return res.status(204).send();
}


module.exports = {
    listarContas, 
    cadastrarConta,
    atualizarUsuario,
    excluirConta
}