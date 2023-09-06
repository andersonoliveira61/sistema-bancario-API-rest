module.exports = {
    numero_conta: 4,
    banco: {
        nome: 'Developers Bank',
        numero: '123',
        agencia: '0001',
        senha: 'Dev123Bank'
    },
    contas: [
    {
        numero: 1,
        saldo: 0,
        usuario: {
          nome: "Alice Johnson",
          cpf: "12345678900",
          data_nascimento: "1990-05-20",
          telefone: "5555555555",
          email: "alice@example.com",
          senha: "senhasegura1"
        }
    },
    {
        numero: 2,
        saldo: 0,
        usuario: {
            nome: "Bob Smith",
            cpf: "98765432100",
            data_nascimento: "1985-12-10",
            telefone: "6666666666",
            email: "bob@example.com",
            senha: "senhasegura2"
        }
    },
    {
        numero: 3,
        saldo: 0,
        usuario: {
            nome: "Eve Brown",
            cpf: "55555555500",
            data_nascimento: "1995-08-25",
            telefone: "7777777777",
            email: "eve@example.com",
            senha: "senhasegura3"
        }
    }

    ],
    saques: [],
    depositos: [],
    transferencias: []
}