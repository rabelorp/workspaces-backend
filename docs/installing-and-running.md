# Instalação e Execução

## Tabela de Documentação<!-- omit in toc -->

- [Instalação e Execução](#instalação-e-execução)
  - [Desenvolvimento local](#desenvolvimento-local)
  - [Links](#links)

## Desenvolvimento local

1. Clone o repositório

   ```bash
   git clone --depth 1 https://git.rabelodigital.com.br/fabrica/rabelodigital/backend.git my-app
   ```

1. Vá até a pasta, e copie `env-example-relational` como `.env`.

   ```bash
   cd my-app/
   cp env-example-relational .env
   ```

1. Mude `DATABASE_HOST=postgres` para `DATABASE_HOST=localhost`

   Mude `MAIL_HOST=maildev` para `MAIL_HOST=localhost`

1. Rode o container da aplicação:

   ```bash
   docker compose up -d postgres adminer maildev
   ```

1. Instale as dependências

   ```bash
   npm install
   ```

1. Rode a configuração de banco de dados

   > Você deve rodar apenas na primeira inicialização, as demais, você deve pular.

   ```bash
   npm run app:config
   ```

2. Rode as migrations

   ```bash
   npm run migration:run
   ```

3. Rode os seeds

   ```bash
   npm run seed:run:relational
   ```

4. Rode a aplicação em modo desenvolvedor

   ```bash
   npm run start:dev
   ```

5. Acesse via <http://localhost:3000>

---

## Links

- Swagger (API docs): <http://localhost:3000/docs>
- Adminer (client for DB): <http://localhost:8080>
- Maildev: <http://localhost:1080>

---

Anterior: [Funcionalidades](introduction.md)

Próximo: [Arquitetura Hexagonal](architecture.md)
