# Banco de Dados

## Tabela de Documentação <!-- omit in toc -->

- [Banco de Dados](#banco-de-dados)
  - [Sobre o banco de dados](#sobre-o-banco-de-dados)
  - [Trabalhando com o banco de dados (TypeORM)](#trabalhando-com-o-banco-de-dados-typeorm)
    - [Gerar migration](#gerar-migration)
    - [Rodar migration](#rodar-migration)
    - [Reverter migration](#reverter-migration)
    - [Excluir todas tabelas](#excluir-todas-tabelas)
  - [Performance e otimização (PostgreSQL + TypeORM)](#performance-e-otimização-postgresql--typeorm)
    - [Indexes e Foreign Keys](#indexes-e-foreign-keys)
    - [Conexões](#conexões)

## Sobre o banco de dados

Está aplicação foi desenvolvida com  PostgreSQL e TypeORM.

## Trabalhando com o banco de dados (TypeORM)

### Gerar migration

1. Crie um arquivo de entidade com a extensão `.entity.ts`. Por exemplo, `post.entity.ts`:

   ```ts
   // /src/posts/infrastructure/persistence/relational/entities/post.entity.ts

   import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
   import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

   @Entity()
   export class Post extends EntityRelationalHelper {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     title: string;

     @Column()
     body: string;

     // Restante dos campos
   }
   ```

2. Depois, gere o arquivo de migration:

   ```bash
   npm run migration:generate -- src/database/migrations/CreatePostTable
   ```

### Rodar migration

```bash
npm run migration:run
```

### Reverter migration

```bash
npm run migration:revert
```

### Excluir todas tabelas

```bash
npm run schema:drop
```
 
## Performance e otimização (PostgreSQL + TypeORM)

### Indexes e Foreign Keys

Don't forget to create `indexes` on the Foreign Keys (FK) columns (if needed), because by default PostgreSQL [does not automatically add indexes to FK](https://stackoverflow.com/a/970605/18140714).

### Conexões

Defina o número ideal para [conexões no postgres](https://node-postgres.com/apis/pool) para a aplicação no arquivo `/.env`:

```txt
DATABASE_MAX_CONNECTIONS=100
```

Quantidade de conexões que o banco de dados pode lidar

---

Anterior: [Banco de dados](database.md)

Próximo: [Autenticação](auth.md)
