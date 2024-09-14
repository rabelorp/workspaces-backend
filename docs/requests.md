# Requisições de Garagens

## Tabela de Documentação <!-- omit in toc -->

- [Requisições de Garagens](#requisições-de-garagens)
    - [Passo 1 - Selecionar data e período da reserva](#passo-1---selecionar-data-e-período-da-reserva)
    - [Passo 2 - Listar todas as categorias de garagem (indoor/outdoor)](#passo-2---listar-todas-as-categorias-de-garagem-indooroutdoor)
      - [Requisição](#requisição)
      - [Resposta](#resposta)
    - [Passo 3 - Filtrar a categoria ‘indoor’ das garagens](#passo-3---filtrar-a-categoria-indoor-das-garagens)
      - [Requisição](#requisição-1)
      - [Resposta](#resposta-1)
    - [Passo 4 - Filtrar as garagens por ‘locationId’ da tabela ‘location’](#passo-4---filtrar-as-garagens-por-locationid-da-tabela-location)
      - [Requisição](#requisição-2)
    - [Passo 5 - Realizar o cadastro de reserva da garagem](#passo-5---realizar-o-cadastro-de-reserva-da-garagem)
      - [Requisição](#requisição-3)

### Passo 1 - Selecionar data e período da reserva

- Como exemplo, foi selecionado o período: **matutino**.

---

### Passo 2 - Listar todas as categorias de garagem (indoor/outdoor)

- O "indoor" é utilizado para carros;
- Já o "outdoor" deve ser utilizado para motos.

#### Requisição

```bash
curl -X 'GET' \
 'http://localhost:9000/api/v1/locations?locationType=garage' \
 -H 'accept: application/json' \
 -H 'Authorization: Bearer TOKEN'
```

#### Resposta

```json
{
  "data": [
    {
      "locationCategory": "indoor",
      "description": "garagem exclusiva para carros",
      "capacity": 7,
      "locationType": "garage",
      "locationName": "Carro01",
      "id": "d26bcc11-8f13-41df-92c7-e7bde3a2ce5d"
    },
    {
      "locationCategory": "outdoor",
      "description": "garagem exclusiva para motos",
      "capacity": 7,
      "locationType": "garage",
      "locationName": "Moto01",
      "id": "d26bcc11-8f13-41df-92c7-e7bde3a2ce5d"
    }
  ]
}
```

---

### Passo 3 - Filtrar a categoria ‘indoor’ das garagens

#### Requisição

```bash
curl -X 'GET' \
 'http://localhost:9000/api/v1/locations?locationCategory=garage&locationCategory=indoor' \
 -H 'accept: application/json' \
 -H 'Authorization: Bearer TOKEN'
```

#### Resposta

```json
{
  "data": [
    {
      "locationCategory": "indoor",
      "description": "garagem exclusiva para carros",
      "capacity": 4,
      "locationType": "garage",
      "locationName": "Carro01",
      "id": "d26bcc11-8f13-41df-92c7-e7bde3a2ce5d" // ESTE ID SERÁ UTILIZADO NO PASSO 4
    }
  ]
}
```

---

### Passo 4 - Filtrar as garagens por ‘locationId’ da tabela ‘location’

#### Requisição

```bash
curl -X 'GET' \
 'http://localhost:9000/api/v1/garages?locationId=d26bcc11-8f13-41df-92c7-e7bde3a2ce5d' \
 -H 'accept: application/json' \
 -H 'Authorization: Bearer TOKEN'
```

```json
{
  "data": [
    {
      "garageType": "car",
      "photoId": "string",
      "locationId": "d26bcc11-8f13-41df-92c7-e7bde3a2ce5d",
      "garageName": "Carro02",
      "capacity": 1,
      "id": "2fc44b37-77f0-4aba-be1f-f94cb988debf"
    },
    {
      "garageType": "car",
      "photoId": "string",
      "locationId": "d26bcc11-8f13-41df-92c7-e7bde3a2ce5d",
      "garageName": "Carro03",
      "capacity": 1,
      "id": "5737c4ba-525d-4661-bc7e-b55d92442095"
    }
  ]
}
```

---

### Passo 5 - Realizar o cadastro de reserva da garagem

#### Requisição

```bash
curl -X 'POST' \
 'http://localhost:9000/api/v1/garage-reservations' \
 -H 'accept: application/json' \
 -H 'Authorization: Bearer TOKEN' \
 -H 'Content-Type: application/json' \
-d '{
"vehiclePlate": "FLCL04S",
"reservationStatus": 2,
"garageId": "5737c4ba-525d-4661-bc7e-b55d92442095",
"userId": 6,
"observation": "calibrar o pneu",
"reservationTime": "matutino",
"reservationDate": "2024-09-14T17:08:35.476Z"
}'
```

---

Anterior: [Testes](benchmarking.md)

Próximo: [Principal](../README.md)
