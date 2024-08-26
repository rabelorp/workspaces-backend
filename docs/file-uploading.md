# Upload de Arquivos

---

## Tabela de Documentação <!-- omit in toc -->

- [Upload de Arquivos](#upload-de-arquivos)
  - [Suporte aos drivers](#suporte-aos-drivers)
  - [Fluxo de upload e anexação ao driver `local`](#fluxo-de-upload-e-anexação-ao-driver-local)
  - [Fluxo de upload e anexação ao driver `s3`](#fluxo-de-upload-e-anexação-ao-driver-s3)
    - [Configuração para o driver `s3`](#configuração-para-o-driver-s3)
  - [Fluxo de upload e anexação ao driver `s3-presigned`](#fluxo-de-upload-e-anexação-ao-driver-s3-presigned)
    - [Configuração para o driver `s3-presigned`](#configuração-para-o-driver-s3-presigned)
  - [Como deletar os arquivos?](#como-deletar-os-arquivos)

---

## Suporte aos drivers

A aplicação suporta os seguintes drivers: `local`, `s3` e `s3-presigned`. Você pode configurá-lo no arquivo `.env`, na variável `FILE_DRIVER`. Caso aja outro serviço de armazenamentos arquivos, a classe pode ser extendida.

> Para produção, é recomendado utilizar o driver "s3-presigned" para aliviar o servidor.

## Fluxo de upload e anexação ao driver `local`

O endpoint `/api/v1/files/upload` é utilizado para fazer upload de arquivos, que retorna a entidade `File` com `id` e `path`. Após receber a entidade `File`, você pode anexá-la a outra entidade.

## Fluxo de upload e anexação ao driver `s3`

O endpoint /api/v1/files/upload é usado para fazer upload de arquivos, retornando uma entidade File com id e caminho. Após receber a entidade File, você pode anexá-la a outra entidade.

### Configuração para o driver `s3`

1. Abra <https://s3.console.aws.amazon.com/s3/buckets>
1. Clique em "Create bucket"
1. Crie um bucket (por exemplo, `rabelodigital-bucket`)
1. Abra o bucket
1. Clique em "Permissions"
1. Procure "Cross-origin resource sharing (CORS)"
1. Clique em "Edit"
1. Cole a seguinte configuração:

   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```

1. Clique em "Save changes"
1. Atualize o `.env` com às seguintes variaveis:

   ```dotenv
   FILE_DRIVER=s3
   ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
   SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
   AWS_S3_REGION=YOUR_AWS_S3_REGION
   AWS_DEFAULT_S3_BUCKET=YOUR_AWS_DEFAULT_S3_BUCKET
   ```

## Fluxo de upload e anexação ao driver `s3-presigned`

O endpoint `/api/v1/files/upload` é utilizado para fazer upload de arquivos. Nesse caso, endpoint recebe apenas a propriedade `fileName` (sem o arquivo binário) e retorna a `s3-presigned` e a entidade `File` com `id` e `path`. Após receber dados, você precisa fazer upload do arquivo para o `s3-presigned` e, depois disso, anexar a entidade `File` a outra entidade.

### Configuração para o driver `s3-presigned`

1. Abra <https://s3.console.aws.amazon.com/s3/buckets>
1. Clique em "Create bucket"
1. Crie o bucket (por exemplo, `rabelodigital-bucket`)
1. Abra o bucket
1. Clique em "Permissions"
1. Procure "Cross-origin resource sharing (CORS)"
1. Clique em "Edit"
1. Cole a seguinte configuração:

   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```

   Para produção, recomendamos utilizar está configuração:

   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["PUT"],
       "AllowedOrigins": ["https://your-domain.com"],
       "ExposeHeaders": []
     },
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```

1. Clique em "Save changes"
1. Atualize o `.env` com às seguintes variaveis:

   ```dotenv
   FILE_DRIVER=s3-presigned
   ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
   SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
   AWS_S3_REGION=YOUR_AWS_S3_REGION
   AWS_DEFAULT_S3_BUCKET=YOUR_AWS_DEFAULT_S3_BUCKET
   ```

## Como deletar os arquivos?

Preferimos não deletar arquivos, pois isso pode causar uma experiência negativa durante a restauração de dados. Por essa razão, também usamos a abordagem de [Soft-Delete](https://orkhan.gitbook.io/typeorm/docs/delete-query-builder#soft-delete) no banco de dados.

---

Anterior: [Serialização de dados](serialization.md)

Próximo: [Testes](tests.md)
