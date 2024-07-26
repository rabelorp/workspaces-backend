# Banco de Dados

## Tabela de Documentação <!-- omit in toc -->

- [Banco de Dados](#banco-de-dados)
  - [Sobre o banco de dados](#sobre-o-banco-de-dados)
  - [Trabalhando com o banco de dados (TypeORM)](#trabalhando-com-o-banco-de-dados-typeorm)
    - [Gerar migration](#gerar-migration)
    - [Rodar migration](#rodar-migration)
    - [Reverter migration](#reverter-migration)
    - [Excluir todas tabelas](#excluir-todas-tabelas)
  - [Seeding (TypeORM)](#seeding-typeorm)
    - [Crie seeds](#crie-seeds)
    - [Rode seed](#rode-seed)
    - [Factory e Faker](#factory-e-faker)
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

## Seeding (TypeORM)

### Crie seeds 

1. Crie o arquivo com `npm run seed:create:relational -- --name=Post`. Onde `Post` é o nome da entidade;
1. Vá até `src/database/seeds/relational/post/post-seed.service.ts`;
1. E no método `run`, estenda sua lógica. 

### Rode seed 

```bash
npm run seed:run:relational
```

### Factory e Faker 

1. Instale o faker:

    ```bash
    npm i --save-dev @faker-js/faker
    ```

1. Crie o arquivo `src/database/seeds/relational/user/user.factory.ts`:

    ```ts
    import { faker } from '@faker-js/faker';
    import { RoleEnum } from '../../../../roles/roles.enum';
    import { StatusEnum } from '../../../../statuses/statuses.enum';
    import { Injectable } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
    import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
    import { StatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

    @Injectable()
    export class UserFactory {
      constructor(
        @InjectRepository(UserEntity)
        private repositoryUser: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private repositoryRole: Repository<RoleEntity>,
        @InjectRepository(StatusEntity)
        private repositoryStatus: Repository<StatusEntity>,
      ) {}

      createRandomUser() {
        //  salvar o contexto de "this"
        return () => {
          return this.repositoryUser.create({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: this.repositoryRole.create({
              id: RoleEnum.user,
              name: 'User',
            }),
            status: this.repositoryStatus.create({
              id: StatusEnum.active,
              name: 'Active',
            }),
          });
        };
      }
    }
    ```

1. Faça alterações no `src/database/seeds/relational/user/user-seed.service.ts`:

    ```ts
    // Implementação...
    import { UserFactory } from './user.factory';
    import { faker } from '@faker-js/faker';

    @Injectable()
    export class UserSeedService {
      constructor(
        // Implementação...
        private userFactory: UserFactory,
      ) {}

      async run() {
        // Implementação...

        await this.repository.save(
          faker.helpers.multiple(this.userFactory.createRandomUser(), {
            count: 5,
          }),
        );
      }
    }
    ```

1. Altere o módulo `src/database/seeds/relational/user/user-seed.module.ts`:

    ```ts
    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    
    import { UserSeedService } from './user-seed.service';
    import { UserFactory } from './user.factory';

    import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
    import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
    import { StatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

    @Module({
      imports: [TypeOrmModule.forFeature([UserEntity, Role, Status])],
      providers: [UserSeedService, UserFactory],
      exports: [UserSeedService, UserFactory],
    })
    export class UserSeedModule {}

    ```

1. Rode o seed:

    ```bash
    npm run seed:run
    ```

---
 
## Performance e otimização (PostgreSQL + TypeORM)

### Indexes e Foreign Keys

Não se esqueça de criar índices nas colunas de Chaves Estrangeiras (FK) (se necessário), pois, por padrão, o PostgreSQL [não adiciona índices automaticamente às FKs.](https://stackoverflow.com/a/970605/18140714).

### Conexões

Defina o número ideal para [conexões no postgres](https://node-postgres.com/apis/pool) para a aplicação no arquivo `/.env`:

```txt
DATABASE_MAX_CONNECTIONS=100
```

Quantidade de conexões que o banco de dados pode lidar

---

Anterior: [Command Line Interface](docs/cli.md)

Próximo: [Autenticação](auth.md)
