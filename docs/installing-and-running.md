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
   docker compose up -d database adminer maildev
   ```

1. Instale as dependências

   ```bash
   npm install
   ```

1. Rode as migrations

   ```bash
   npm run migration:run
   ```

1. Rode a aplicação em modo desenvolvedor

   ```bash
   npm run start:dev
   ```

1. Acesse via <http://localhost:3000>

1. Instalar a extensão SonarLint no Vscode e ajustar o User Settings local:

```bash
  "sonarlint.pathToNodeExecutable": "/home/robson/.nvm/versions/node/v20.17.0/bin/node",
  "sonarlint.focusOnNewCode": true,
  "sonarlint.connectedMode.connections.sonarqube": [
    {
      "serverUrl": "http://localhost:9002",
      "connectionId": "rabelodigital"
    }
  ],
```

---

## Links

- Swagger (API docs): <http://localhost:3000/docs>
- Adminer (client for DB): <http://localhost:8080>
- Maildev: <http://localhost:1080>

---

Anterior: [Funcionalidades](introduction.md)

Próximo: [Arquitetura Hexagonal](architecture.md)
