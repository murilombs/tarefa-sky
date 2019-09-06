require('./src/mongodb/mongodb.test').testes() // conexão com o banco
require('./src/schema/user'); // carrega o schema
require('./src/repository/repository.test').testes() // testes das funçoes do Repositorio
