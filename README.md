# ionic + node.js + mongoDB

Projeto para o coding dojo do Mastertech (29/01/2016).
O projeto node.js + mongodb foi um fork do projeto da Marina que modificamos [RinaCoimbra/mongodb-test](https://github.com/RinaCoimbra/mongodb-test)

O projeto ionic foi iniciado do zero.

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

**[OPCIONAL] Se você quiser criar um novo projeto ionic, basta rodar o comando `ionic start [template]`, por exemplo: `ionic start sidemenu`. **

Para rodar o projeto ionic na porta 8082, entre na pasta do projeto ionic (blank) e rode o projeto na porta 8082:
```
$ cd blank/
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

O projeto vai rodar no endereço: [https://[NOMEDOWORKSPACE]-[NOMEDOUSUARIO].c9users.io:8082/](https://[NOMEDOWORKSPACE]-[NOMEDOUSUARIO].c9users.io:8082/). Não se esqueça de substituir *[NOMEDOWORKSPACE]* pelo nome do workspace e *[NOMEDOUSUARIO]* pelo nome do seu usuário no c9.

Por exemplo, o meu ficou assim: [https://ionic-node-thdaraujo.c9users.io:8082/](https://ionic-node-thdaraujo.c9users.io:8082/)


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
No terminal que for aberto, entre na pasta do projeto node.js (*mongodb-test/mongodb-test*), instale as dependências com o *npm* e rode o projeto com *start*:

```
$ cd mongodb-test/mongodb-test
$ npm install
$ npm start
```

O projeto vai rodar no endereço: [https://[NOMEDOWORKSPACE]-[NOMEDOUSUARIO].c9users.io/](https://[NOMEDOWORKSPACE]-[NOMEDOUSUARIO].c9users.io/). Não se esqueça de substituir *[NOMEDOWORKSPACE]* pelo nome do workspace e *[NOMEDOUSUARIO]* pelo nome do seu usuário no c9.

Por exemplo, o meu ficou assim: [https://ionic-node-thdaraujo.c9users.io/](https://ionic-node-thdaraujo.c9users.io/).

Com isso, teremos 3 terminais rodando o projeto ionic, o projeto node.js e o mongoDB.

