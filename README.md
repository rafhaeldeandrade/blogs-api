# Projeto Blog's API

Nesse projeto foi desenvolvido uma API utilizando `express` para um blog, seguindo os princípios `REST`. Conta, também com autenticação e autorização com `JWT`.

## Tecnologias utilizadas
- Node.js
- Express
- Sequelize
- MySQL
- Joi
- JWT

## Como instalar as dependências

- Comece clonando o repositório
  ```
  git clone https://github.com/rafhaeldeandrade/blogs-api.git

  ou

  git clone git@github.com:rafhaeldeandrade/blogs-api.git
  ```
- Entre na pasta clonada e instale as dependências utilizando NPM ou Yarn
  ```
  npm install OR yarn install
  ```
- É necessário informar as informações relacionadas ao banco de dados que será utilizada no projeto, também será necessário informar um `JWT_SECRET` que será utilizado para assinar os tokens `JWT`, sendo assim:
  - Crie um arquivo `.env` na raiz do projeto
    - Modifique as chaves `MYSQL_USER`, `MYSQL_PASSWORD`, `HOSTNAME`, `JWT_SECRET`;
    - Exemplo de arquivo `.env`:
      ```
      MYSQL_USER=root
      MYSQL_PASSWORD=root
      HOSTNAME=localhost
      JWT_SECRET=suasecretaqui
      ```
    - Por padrão o nome da tabela será `blogs_api`
- Utilize `npm run prestart` para deixar que o `Sequelize` fique encarregado de criar o Schema e as tabelas no banco de dados
- Caso deseje que as tabelas sejam populadas com dados de test, utilize `npm run seed`
- Para iniciar o projeto, certifique-se de que o servidor MySQL está de pé e use `npm start`, acesse a API no http://localhost:3000

# Endpoints disponíveis:

## POST /login
- Endpoint capaz de logar o usuário, retornando um token `JWT` caso os dados estejam corretos
- O corpo da requisição deverá seguir o seguinte formato:
  ```JSON
  {
    "email": "email@mail.com",
    "password": "123456"
  }
  ```
- Caso a requisição seja válida, será retornado um token JWT, exemplo:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```

## POST /user
- Endpoint capaz de adicionar um novo `user` a sua tabela no banco de dados;
- O corpo da requisição deverá seguir o seguinte formato:
  ```JSON
  {
    "displayName": "Rafhael Gomes",
    "email": "rafhael@email.com",
    "password": "123456",
    "image": null
  }
  ```
  - `displayName` deve ser uma string com 8 caracteres no mínimo;
  - `email` deve ser uma string e só será validado se tiver o formato `prefixo@domínio`. Deverá ser único;
  - `password` deve ser uma string, é obrigatório e deverá ter 6 caracteres;
- Caso a requisição seja válida, será retornado um token JWT, exemplo:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```

## GET /user
- **Necessário informar um token `JWT` na key `Authorization` do `Header` da requisição**
- Endpoint capaz de retornar os detalhes de todos os usuários cadastrados
- Caso a requisição seja válida, será retornado um JSON, com todos os usuários cadastrados dentro de um array, exemplo:
  ```JSON
  [
    {
      "id": "401465483996",
      "displayName": "Brett Wiltshire",
      "email": "brett@email.com",
      "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    }
  ]
  ```

## GET /user/:id
- **Necessário informar um token `JWT` na key `Authorization` do `Header` da requisição**
- Endpoint capaz de retornar detalhes de um usuário com `id` passado pelo parâmetro da rota
- Caso a requisição seja válida, será retornado um JSON com os dados do usuário, exemplo:
  ```JSON
  {
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```

## DELETE /user/me
- **Necessário informar um token `JWT` na key `Authorization` do `Header` da requisição**
- **Somente o próprio usuário poderá se deletar**
- Caso a requisição seja válida, será retornado um `status http 204`

## POST /categories
- **Necessário informar um token `JWT` na key `Authorization` do `Header` da requisição**
- Endpoint capaz de criar uma `categoria` no banco de dados
- O corpo da requisição deverá seguir o seguinte formato:
  ```JSON
  {
    "name": "Filmes"
  }
  ```
- Caso a requisição seja válida, será retornado um JSON contendo o `id` e o `name` da categoria cadastrada, exemplo:
  ```JSON
    {
      "id": 4,
      "name": "Filmes"
    }
  ```

## GET /categories
- **Necessário informar um token `JWT` na key `Authorization` do `Header` da requisição**
- Endpoint capaz de retornar os detalhes de todas as categorias cadastradas
- Caso a requisição seja válida, será retornado um JSON com todas as categorias cadastradas dentro de um array, exemplo:
  ```JSON
  [
    {
      "id": 1,
      "name": "Séries"
    },
    {
      "id": 2,
      "name": "Filmes"
    }
  ]
  ```

## POST /post
- **Necessário informar um token `JWT` na key `Authorization` do `Header` da requisição**
- Endpoint capaz de adicionar um novo `blogpost` no banco de dados
- O corpo da requisição deverá seguir o seguinte formato:
  ```JSON
  {
    "title": "First blogspot",
    "content": "The whole text",
    "categoryIds": [1, 2]
  }
  ```
- Caso a requisição seja válida, será retornado um JSON contendo `id`, `userId`, `title` e `content`, exemplo:
  ```JSON
  {
    "id": 1,
    "userId": 1,
    "title": "First blogspot",
    "content": "The whole text"
  }
  ```

## GET /post
- **Necessário informar um token `JWT` na key `Authorization` do `Header` da requisição**
- Endpoint capaz de retornar os detalhes todos os `blogposts` cadastrados
- Caso a requisição seja válida, será retornado um JSON com a seguinte estrutura:
  ```JSON
  [
    {
      "id": 1,
      "title": "Post do Ano",
      "content": "Melhor post do ano",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Juash",
        "email": "lewis@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg"
      },
      "categories": [
        {
          "id": 1,
          "name": "Carros"
        }
      ]
    }
  ]
  ```

## GET /post/:id
- **Necessário informar um token `JWT` na key `Authorization` do `Header` da requisição**
- Endpoint capaz de retornar os detalhes de um `blogpost` com `id` passado pelo parâmetro da rota
- Caso a requisição seja válida, será retornado um JSON com a seguinte estrutura:
  ```JSON
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Juash",
      "email": "lewis@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Carros"
      }
    ]
  }
  ```

## GET /post/search?q=:searchTerm
- **Necessário informar um token `JWT` na key `Authorization` do `Header` da requisição**
- Endpoint capaz de retornar um `blogpost` que contenham em seu `title` ou `content` o termo pesquisado no `query param` da URL
- Caso a requisição seja válida, será retornado um JSON, com todos os posts que satisfaçam a pesquisa dentro de um array, exemplo:
  ```JSON
  [
    {
      "id": 2,
      "title": "Vamos que vamos",
      "content": "Foguete não tem ré",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 2,
          "name": "Escola"
        }
      ]
    }
  ]
  ```

## PUT /post/:id
- **Necessário informar um token `JWT` na key `Authorization` do `Header` da requisição**
- **Somente o usuário criador do `blogpost` poderá alterá-lo**
- Endpoint capaz de alterar o `title` e o `content` de um `blogpost`
- O corpo da requisição deverá seguir o seguinte formato:
  ```JSON
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```

## DELETE /post/:id
- **Necessário informar um token `JWT` na key `Authorization` do `Header` da requisição**
- **Somente o usuário criador do `blogpost` poderá deletá-lo**
- Caso a requisição seja válida, será retornado um `status http 204`, sem nada no corpo da resposta

