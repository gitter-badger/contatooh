# Comandos executados:

# Cria o arquivo "package.json" já com valores default
```
npm init
npm install express@4.8 --save
```

# Criando arquivo de configuração do NodeJs
```
/config/express.js
```

# Rodando o servidor (http://localhost:3000):
```
node server
```

# Templates Engine do Express => EJS (http://embeddedjs.com)
```
npm install ejs@0.8 --save
```

# O nodemon evitar termos que reiniciar o servidor para refletir atualizações 
```
npm install nodemon -g
nodemon server
```

# Utilizando 'method-override' para navegadores que não suportam 
# os metodos HTTP: DELETE, PUT
```
npm install body-parser@1.6 method-override@2.1 --save
```

# Instalando Bower para gerenciamento de dependências do front-end
```
npm install bower@1.3 -g
bower init
```

# Criando o arquivo '.bowerrc' para configurar em qual pasta serão salvas as dependêcnias do Bower
# bower install pacote#versao --save
# bower search angular
# bower info angular
# bower uninstall angular --save
```
bower install angular#1.3 --save
```

# Adicionando modulo de rotas do AngularJS
```
bower install angular-route#1.3 --save
```

# Adicionando Bootstrap pelo Bower
```
bower install bootstrap#3.3 --save
```

# Add. 'angular-resource' para trabalhar com REST
```
bower install angular-resource#1.3 --save
```























# ##############################################################
# MongoDB
# ##############################################################
```
mongo --port 27017 --host localhost
```

# Cria 'db' 'contatooh'
```
use contatooh
```

# Cria registro no MongoDB na collection 'contatos' dentro do db 'contatooh'
```
var contato1 = { "nome" : "Contato 1 Mongo", "email" : "cont1@empresa.com.br" }
var contato2 = { "nome" : "Contato 2 Mongo", "email" : "cont2@empresa.com.br" }
var contato3 = { "nome" : "Contato 3 Mongo", "email" : "cont3@empresa.com.br" }
db.contatos.insert(contato1)
db.contatos.insert(contato2)
db.contatos.insert(contato3)
```

# Mostra Collections criadas
```
show dbs
show collections
```

# Buscando documentos
```
db.contatos.find();
```

# apagando o banco 
```
db.dropDatabase();
```

# Vendo registro a registro
```
var contatos = db.contatos.find()
contatos.next()
contatos.next()
contatos.next()
```

# Retorna apenas o primeiro registro
```
db.contatos.findOne()
```

# Buscas com critérios
```
var criterio = { "email" : "cont2@empresa.com.br" }
var contato = db.contatos.find(criterio)
contato
```

# Buscando por nome usando expressão regular como "%LIKE%" não sendo case sensitive 
```
var criterio = { "nome" : /tato/i }
var contatos = db.contatos.find(criterio)
```

# Count
```
db.contatos.count()
db.contatos.count({ "nome" : /to 2/i })
```

# Buscando com operador OR
```
db.contatos.find({ "$or" : [
{ "email" : "cont2@empresa.com.br" },
{ "nome" : "Contato 1 Mongo" }
])
```

# contatos que não contenham como e-mail 'cont2@empresa.com.br', através do query selector $ne
```
db.contatos.find({
"email" : { "$ne" : "cont2@empresa.com.br" }
});
```

# Operadores para query no MongoDB => http://docs.mongodb.org/manual/reference/operator/query/

# Indexando documentos, no JSON informado O valor 1 indica que queremos um índice ascendente, mas é possível trabalhar na ordem decrescente utilizando -1 como valor.
```
db.contatos.ensureIndex({ "email" : 1 })
```

# Lista todos os índice de uma collection
```
db.contatos.getIndexes()
```

# Apagando index
```
db.contatos.dropIndex('email_1')
```

# Crinado índices únicos
# Mais informações de como criar indeces em => http://docs.mongodb.org/manual/reference/method/db.collection.ensureIndex/
```
db.contatos.ensureIndex( { email: 1 }, { unique: true } )
```

# Retornando apenas um pedaço do Documento, onde o primeiro parâmetro '{}' é o filtro utilizado e o segundo parâmetro representa quais propriedades queremos retornar 
# o parametro '1' indica que queremos que venha essa propriedade e o '0' indica que não é para retornar essa propriedade
```
db.contatos.find({}, { "nome" : 1, _id : 0 })
```

# Removendo documentos
```
db.contatos.remove()
db.contatos.remove({ "email" : "cont1@empresa.com.br" })
```

# Atualizando documentos
```
var criterio = { "email" : "cont3@empresa.com.br" }
var contato = db.contatos.findOne(criterio);
contato.nome = "Nome Alterado"
db.contatos.update(criterio, contato)
```

# Realizando upserts => Ao realizar um update se o documento não existir ele é criado
```
var contato4 = { "nome" : "Contato 4 mongo", "email" : "cont4@empresa.com.br" }
db.contatos.update({ "nome" : /4/ }, contato4, true);
```

# Updates mais preciso com $set
```
db.contatos.update(
  { "email" : "cont4@empresa.com.br"},
  { "$set" : { "nome" : "Mais uma alteração" } }
)
```

# Algo parecido com transação no MongoDB => http://docs.mongodb.org/manual/tutorial/perform-two-phase-commits/

# Simulando JOINS no MongoDB
```
var contato = db.contatos.findOne({ "email" : /cont2/ })
var emergencia = db.contatos.findOne({ "email" : /cont3/})
contato.emergencia = emergencia._id
db.contatos.update({ "_id" : contato._id}, contato);
contato = db.contatos.findOne( "_id", contato._id)

var emergencia = db.contatos.findOne({ "_id" : contato.emergencia});
emergencia
```

# DBRefs: database references
```
var contato = db.contatos.findOne({ "email" : /cont2/ })
contato
var emergencia = db.contatos.findOne({ "_id" : contato.emergencia});

contato.emergencia = {
"$ref" : "contatos",
"$id" : emergencia._id
}

db.contatos.update({"_id" : contato._id}, contato);

contato = db.contatos.findOne({"_id" : contato._id});
contato
contato.emergencia
```

# Resolvendo relacionamentos DBref
# Mais tipos de consultas no mongo em => http://docs.mongodb.org/manual/tutorial/query-documents/
```
function refResolver(ref) {
  return db[ref.$ref].findOne({"_id": ref.$id})
}

var emergencia = refResolver(contato.emergencia);
emergencia
```





