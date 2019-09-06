const repository = require("./repository");
const test = require("tape");

var data = {
    nome: "teste",
    email: "testes",
    senha: "testes",
    telefones: [ ]
}

var dataUp = {
    nome: "nome novo"
}

function testes() {
    test("Function getUserByID", (t) => {
        repository.getUserByID("5d700fa4962bc53164892dbc", (err, user) => {
            t.assert(!err && user, "User retornado");
            t.end()
        })
    })

    test('Function saveNewUser', (t) => {
        repository.saveNewUser(data, (err, res) => {
            t.assert(!err && res.insertedCount == 1, 'User salvo');
            t.end();
        })
    })

    test('Repository updateByID', (t) => {
        repository.updateUserByID("5d700fa4962bc53164892dbc", dataUp, (err, res) => {
            t.assert(!err && res.modifiedCount == 1, 'Item updated');
            t.end();
        })
    }) 
}

module.exports = { testes }