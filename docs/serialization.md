# Serialização de dados

Está aplicação utiliza [class-transformer](https://www.npmjs.com/package/class-transformer) e um interceptador global `ClassSerializerInterceptor`.

---

## Tabela de Documentação<!-- omit in toc -->

- [Serialização de dados](#serialização-de-dados)
  - [Ocultar propriedade privada](#ocultar-propriedade-privada)
  - [Mostrar propriedade privada para administradores](#mostrar-propriedade-privada-para-administradores)

---

## Ocultar propriedade privada

Se você precisar ocultar alguma propriedade na entidade, pode usar `@Exclude({ toPlainOnly: true })` na coluna.

```ts
// /src/users/entities/user.entity.ts

import { Exclude } from 'class-transformer';

@Entity()
export class User extends EntityRelationalHelper {
  // Implementação...

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  // Implementação...
}
```

## Mostrar propriedade privada para administradores

1. Crie um controlador que retorna apenas dados para o administrador e adicione `@SerializeOptions({ groups: ['admin'] })` ao método:

   ```ts
   // /src/users/users.controller.ts 

   @ApiBearerAuth()
   @Roles(RoleEnum.admin)
   @UseGuards(AuthGuard('jwt'), RolesGuard)
   @Controller({
     path: 'users',
     version: '1',
   })
   export class UsersController {
     constructor(private readonly usersService: UsersService) {}

     // Implementação...

     @SerializeOptions({
       groups: ['admin'],
     })
     @Get(':id')
     @HttpCode(HttpStatus.OK)
     findOne(@Param('id') id: string) {
       return this.usersService.findOne({ id: +id });
     }

     // Implementação...
   }
   ```

1. Na entidade, adicione `@Expose({ groups: ['admin'] })` à coluna que deve ser exposta para o administrador:

   ```ts
   // /src/users/entities/user.entity.ts

   // Implementação...

   import { Expose } from 'class-transformer';

   @Entity()
   export class User extends EntityRelationalHelper {
     // Implementação...

     @Column({ unique: true, nullable: true })
     @Expose({ groups: ['admin'] })
     email: string | null;

     // Implementação...
   }
   ```

---

Anterior: [Autenticação](auth.md)

Próximo: [Upload de arquivos](file-uploading.md)
