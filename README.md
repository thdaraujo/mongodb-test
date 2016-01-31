# ionic + node.js + mongoDB

Projeto para o coding dojo do Mastertech (29/01/2016).
O projeto node.js + mongodb (*node-mongo*) foi um fork do projeto da Marina que modificamos [RinaCoimbra/mongodb-test](https://github.com/RinaCoimbra/mongodb-test)

O projeto ionic foi iniciado do zero (*ionic*).

## Clonar o projeto no Cloud9

Primeiro, crie um workspace do tipo **NODE.JS** no cloud9.
Depois, apague os diretórios e arquivos que o cloud9 cria automaticamente, pois não serão utilizados.
Você também pode rodar o comando `$ rm -rfv ./*` para removê-los.

No terminal, clone o projeto e entre na pasta:
```
$ git clone https://github.com/thdaraujo/mongodb-test.git
$ cd mongodb-test/
```

## Instalando as dependências do ionic e rodando o app

Para instalar o ionic, digite no terminal o seguinte comando e aguarde:
```
$ npm install -g cordova ionic
```

**OPCIONAL:** Se você quiser criar um novo projeto ionic, basta rodar o comando `ionic start [template]`, por exemplo: `ionic start sidemenu`.

Para rodar o projeto ionic na porta 8082, entre na pasta do projeto ionic (*ionic/*) e rode o projeto na porta 8082:
```
$ cd ionic/
$ ionic serve -p 8082 --nolivereload  
```

Se aparecer o texto abaixo:

>Multiple addresses available.
>
>Please select which address to use by entering its number from the list below:
>
>  1) 172.17.41.77 (eth0)
>
>  2) localhost

É só digitar **1** e dar enter.

O projeto vai rodar no endereço: [http://[NOMEDOWORKSPACE]-[NOMEDOUSUARIO].c9users.io:8082/](http://[NOMEDOWORKSPACE]-[NOMEDOUSUARIO].c9users.io:8082/). 
Não se esqueça de substituir *[NOMEDOWORKSPACE]* pelo nome do workspace e *[NOMEDOUSUARIO]* pelo nome do seu usuário no c9.

Por exemplo, o meu ficou assim: [http://ionic-node-mongo-thdaraujo.c9users.io:8082/](http://ionic-node-mongo-thdaraujo.c9users.io:8082/)

## Inicializando o mongoDB
[(Documentação do cloud9)](https://docs.c9.io/docs/setting-up-mongodb)
 
Precisamos também inicializar o mongoDB. Abra outro terminal via menu `Window > New Terminal` ou pelo atalho `ALT + T`.
No terminal que for aberto, rode os comandos abaixo:

```
$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod
$ mongod
```
Com isso, o servidor do mongoDB vai ficar rodando nesse terminal.

## Rodando o projeto o node.js
Por fim, vamos rodar o projeto node.js também em outro terminal.

Abra outro terminal via menu `Window > New Terminal` ou pelo atalho `ALT + T`.
No terminal que for aberto, entre na pasta do projeto node.js (*mongodb-test/node-mongo*), instale as dependências com o *npm* e rode o projeto com *start*:

```
$ cd mongodb-test/node-mongo
$ npm install
$ npm start
```

O projeto vai rodar no endereço: [http://[NOMEDOWORKSPACE]-[NOMEDOUSUARIO].c9users.io/](http://[NOMEDOWORKSPACE]-[NOMEDOUSUARIO].c9users.io/). Não se esqueça de substituir *[NOMEDOWORKSPACE]* pelo nome do workspace e *[NOMEDOUSUARIO]* pelo nome do seu usuário no c9.

Por exemplo, o meu ficou assim: [http://ionic-node-mongo-thdaraujo.c9users.io/](http://ionic-node-mongo-thdaraujo.c9users.io/).

Com isso, teremos 3 terminais rodando o projeto ionic, o projeto node.js e o mongoDB.

##Sobre as urls da API e do App Ionic no Cloud9
**Importante:** NUNCA coloque _http**s**_ na url do app, pois o cloud9 dá alguns problemas de Cross-Origin Resource Sharing (CORS) por causa disso. Sempre abra o app ionic com o link *http://etc...* 
O tratamento para evitar esse problema de CORS foi feito no arquivo `mongodb-test/node-mongo/server.js`.

**Opcional:** Caso a sua API *node.js* esteja rodando em um workspace/porta diferente do exemplo acima, é preciso editar o código do app para que ele aponte para a url correta.

No projeto ionic, abra o seguinte arquivo javascript: `mongodb-test/ionic/www/js/controllers.js`
No final do arquivo, temos a função javascript que define a url base da API (backend node.js):

```
//retorna a url atual do cloud 9. Modificar caso utilize porta ou host diferente.
function getAPIBaseUrl() {
  return 'http://' + location.hostname;
}
```
Essa função é usada para apontar o GET e o POST no DashCtrl.
Caso o seu backend node.js esteja rodando em outra url ou porta, edite a função acima.
