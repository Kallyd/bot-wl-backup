## Introdução

Esse bot foi criado com o objetivo de aprovar whitelist e fazer backup do banco de dados.
Tem algumas outras funções, como vou citar abaixo:

1. Backup de banco de dados
2. Aprovar whitelist
3. Ticket
4. Avisos
5. Aplicar Adv por comando
6. Limpar canal discord
7. Deletar canal do discord




## Instalação

## Instalando o Node.JS
Para instalar o bot, primeiramente você precisa ter o node.js instalado, versão LTS para não haver nenhum problema.

Link do download:
https://nodejs.org/en/download

Após baixado, execute o arquivo install.bat para instalar as dependências do bot.

Feito a instalação das dependências abre o console e digite:
bash
  node -v

Feito este comando deve-se retornar a versão do nodejs.



## Instalação do BOT
Execute o arquivo botdb.sql e carregue as novas tabelas dentro do seu banco de dados.

Feito isso, vamos para a configuração.

No arquivo config.json, você irá inserir as informações, como usuário do banco de dados,
prefixo, token bot, ip e nome do banco de dados.
Lembrando que:

Caso o banco de dados for hospedado na própria maquina aonde está hospedado o bot, deixe 127.0.0.1, e o usuário como padrão root.
Caso tenha senha para acessar o banco de dados, insira também.


  "prefix": "!", // Prefixo
  "token": "",  // Token Bot

  "conexaodb" : "127.0.0.1",
  "userdb" : "root", // Usuário do banco de dados
  "senhadb" : "", // Senha do banco de dados
  "db" : "" // Nome do seu banco de dados



Após inserir todos os dados acima, vamos para a configuração da whitelist.

Caso queira mudar as perguntas, acesse o seguintes local:
src/comandos/Fivem/whitelist.js.

Da linha 107 até a linha 131 terão as perguntas.

Cada pergunta correta ela é considerada 1 exp.
