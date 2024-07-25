# Autenticação

## Tabela de Documentação <!-- omit in toc -->

- [Autenticação](#autenticação)
  - [Informações geral](#informações-geral)
    - [Fluxo de autenticação](#fluxo-de-autenticação)
  - [Configuração](#configuração)
  - [Sobre JWT strategy](#sobre-jwt-strategy)
  - [Fluxo Refresh token](#fluxo-refresh-token)
  - [Logout](#logout)

## Informações geral

### Fluxo de autenticação

Por padrão, a aplicação faz login via e-mail, senha e gere um JWT Token.

## Configuração

1. Gere secret keys para `access token` e `refresh token`:

   ```bash
   node -e "console.log('\nAUTH_JWT_SECRET=' + require('crypto').randomBytes(256).toString('base64') + '\n\nAUTH_REFRESH_SECRET=' + require('crypto').randomBytes(256).toString('base64') + '\n\nAUTH_FORGOT_SECRET=' + require('crypto').randomBytes(256).toString('base64') + '\n\nAUTH_CONFIRM_EMAIL_SECRET=' + require('crypto').randomBytes(256).toString('base64'));"
   ```

1. Vá até `/.env` e substitua `AUTH_JWT_SECRET` and `AUTH_REFRESH_SECRET` com a saída do passo 1.

   ```text
   AUTH_JWT_SECRET=HERE_SECRET_KEY_FROM_STEP_1
   AUTH_REFRESH_SECRET=HERE_SECRET_KEY_FROM_STEP_1
   ```

## Sobre JWT strategy

No método `validate` do arquivo `src/auth/strategies/jwt.strategy.ts`, você pode ver que não verificamos se o usuário existe no banco de dados porque é redundante, pode perder os benefícios da abordagem JWT e pode afetar o desempenho da aplicação.

```typescript
// src/auth/strategies/jwt.strategy.ts

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // ...

  public validate(payload) {
    if (!payload.id) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
```

> Se você precisar obter informações completas do usuário, busque em serviços.

## Fluxo Refresh token

1. Faça login em (`POST /api/v1/auth/email/login`) para receber um `token`, `tokenExpires` e `refreshToken` na resposta.
1. Em cada solicitação deve ser enviado `token` e `Authorization` no cabeçalho.
2. Se o token estiver expirado, você precisa enviar o `refreshToken` para POST /api/v1/auth/refresh no cabeçalho Authorization para atualizar o token. Você receberá um novo `token`, `tokenExpires` e `refreshToken` na resposta.

## Logout

1. Faça uma chamada no endpoint:

   ```text
   POST /api/v1/auth/logout
   ```

2. Remova o `access token` e `refresh token` da aplicação cliente.

---

Anterior: [Banco de dados](database.md)

Próximo: [Serialização de dados](serialization.md)
