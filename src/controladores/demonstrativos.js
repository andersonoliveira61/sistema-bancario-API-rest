const { contas } = require('../bancodedados');
const { saques, depositos, transferencias } = require('../bancodedados');

const saldo = (req, res) => {
    const { numero_conta } = req.query;
    const contaAtual = contas.find((elemento) => {
        return elemento.numero === Number(numero_conta)
    }) 

    if (contaAtual) {
        return res.status(200).json({saldo: contaAtual.saldo})
    }

}

const extrato = (req, res) => {
    const { numero_conta } = req.query;
    const contaAtual = contas.find((elemento) => {
        return elemento.numero === Number(numero_conta)
    })

    const extratoDepositos = depositos.filter((elemento) => {
        return elemento.numero_conta === contaAtual.numero;
    })

    const extratoSaques = saques.filter((elemento) => {
        return elemento.numero_conta === contaAtual.numero;
    })

    const transferenciasEnviadas = transferencias.filter((elemento) => {
        return elemento.numero_conta === contaAtual.numero;
    })

    const transferenciasRecebidas = transferencias.filter((elemento) => {
        return elemento.numero_conta_destino === contaAtual.numero;
    })

    const movimentacoesConta = {
        depositos: extratoDepositos,
        saques: extratoSaques,
        transferenciasEnviadas: transferenciasEnviadas,
        transferenciasRecebidas: transferenciasRecebidas
    }

    return res.status(200).json(movimentacoesConta);
}

module.exports = {
    saldo,
    extrato
}