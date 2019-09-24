# Movie Frontend

Antes de executar o projeto deve ser instalada as depedências.

```
  $ npm i
```

Caso queira executar em modo de desenvolvimento deve ser criado um arquivo .env.dev e para o ambiente de producação basta utilizar o arquivo .env
as váriaveis de ambientes para serem definidas são as seguintes

```
  BASE_URL=

  MOVIE_API_KEY=
  MOVIE_API_URL=
  MOVIE_URL_IMG=
```

Ser for necessário buildar o projeto pode executar o comando

```
  $ npm run build
```

Os testes foram desenvolvidos com o framework Cypress.js, para poder executar os teste a API deve estar sendo executada e o Frontend deve ser sendo executado na porta 8080, caso seja necessário alterar a porta basta modificar no arquivo de configuração (cypress.json).

```
  $ npm test
```

Projeto está hospedado no servidor surge.sh, para acessar o mesmo bastar acessar o seguinte link
![http://smart-movies.surge.sh](http://smart-movies.surge.sh)
