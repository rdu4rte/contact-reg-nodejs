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
- Root: /api/v1/
- Swagger Docs: /api-docs/swagger

## Auto Generate Clients

Ao iniciar a aplicação, realizar uma requisição POST no endpoint "/client" para gerar os clientes dos bancos "Macapá"(MySQL) e "VareJão"(PostgreSQL) conforme orientado.

## Swagger Authentication

Após gerar os clientes e logar na API utilizando o endpoint "/auth/signin", clicar no botão "Authorize" no canto superior direito e adicionar o token APÓS a palavra "Bearer" e clicar em "Authorize".

Exemplo: "Bearer eyJhbGciOiJIjoxNTE2MjM5MDIyfQSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"