## Contact Register - Job Challange (Mercafacil)

NodeJS, TypeScript, InversifyJS, Express, TypeORM, PostgreSQL/MySQL, Authentication with JsonWebToken

## Instalação

```bash
$ npm install
```

## Pré-Run

Criar um arquivo ".env" na raiz do projeto, substituindo as variáveis de ambiente com os parâmetros para conexão com os respectivos bancos baseados no arquivo ".env-sample".

## Run App

```bash
# development
$ npm run dev

# build for production
$ npm run build

# production
$ npm run start
```

## Endpoints
- Root: https://localhost:3003/api/v1/
- Swagger Docs: http://localhost:3003/api-docs/swagger

## Auto Generate Clients

Ao iniciar a aplicação, realizar uma requisição POST no endpoint "https://localhost:3003/api/v1/client" para gerar os clientes dos bancos "Macapá"(MySQL) e "VareJão"(PostgreSQL) conforme orientado.

## Swagger Authentication

Após gerar os clientes e logar na API utilizando o endpoint "https://localhost:3003/api/v1/auth/signin", clicar no botão "Authorize" no canto superior direito e adicionar o token APÓS a palavra "Bearer" e clicar em "Authorize".

Exemplo: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"