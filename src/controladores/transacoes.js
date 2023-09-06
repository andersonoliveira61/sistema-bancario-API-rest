const { contas } = require('../bancodedados');
const { saques, depositos, transferencias } = require('../bancodedados');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;
    const contaAtual = contas.find((elemento) => {
        return elemento.numero === Number(numero_conta)
       }) 
    
    if (!numero_conta || !valor) {
        return res.status(404).json({mensagem: 'O número da conta e o valor são obrigatórios!'})
    }
    if (!contaAtual) {
        return res.status(404).json({mensagem: 'Conta não encontrada!'})
    }
    if (valor <= 0) {
        return res.status(404).json({mensagem: 'O valor não pode ser menor que zero!!'})
    }
    const novoDeposito = {
        data: new Date(),
        numero_conta,
        valor
    }
    
    contaAtual.saldo += valor;

    depositos.push(novoDeposito);

    return res.status(201).send();

}

const sacar = (req, res) => {
   const { numero_conta, valor } = req.body;
   const contaAtual = contas.find((elemento) => {
    return elemento.numero === Number(numero_conta)
   }) 

    if (!contaAtual || !valor) {
        return res.status(404).json({mensagem: 'O número da conta e o valor são obrigatórios!'})
    } 
    if (valor <= 0) {
        return res.status(404).json({mensagem: 'O valor não pode ser menor que zero!!'})
    }
    if (contaAtual.saldo < valor) {
        return res.status(400).json({mensagem: 'Saldo insuficiente!'})
    }

    contaAtual.saldo -= valor;

    const novoSaque = {
        data: new Date(),
        numero_conta,
        valor
    }

    saques.push(novoSaque);

    res.status(201).send();


}

const transferir = (req, res) => {
    const { numero_conta, numero_conta_destino, valor } = req.body;
    const contaAtual = contas.find((elemento) => {
        return elemento.numero === Number(numero_conta)
    }) 

    const contaDestino= contas.find((elemento) => {
        return elemento.numero === Number(numero_conta_destino)
    }) 
            
            if(!contaDestino){
                return res.status(404).json({mensagem: 'Conta de destino não encontrada!'})
            }
            if (!valor){
                return res.status(400).json({mensagem: 'Valor da transferência não informado!'})
            }
            if (valor <= 0) {
                return res.status(404).json({mensagem: 'O valor não pode ser menor que zero!!'})
            }
            if (contaAtual.saldo < valor) {
                return res.status(400).json({mensagem: 'Saldo insuficiente!'})
            }

            contaAtual.saldo -= valor;
            contaDestino.saldo += valor;

            const novaTransferencia = {
                data: new Date(),
                numero_conta,
                numero_conta_destino,
                valor
            }

            transferencias.push(novaTransferencia);

            res.status(201).send()

}


module.exports = {
    depositar,
    sacar,
    transferir
}