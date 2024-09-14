# Teste de benchmarking

## Tabela de Documentação <!-- omit in toc -->

- [Teste de benchmarking](#teste-de-benchmarking)
  - [Apache Benchmark](#apache-benchmark)

## Apache Benchmark

```bash
docker run --rm jordi/ab -n 100 -c 100 -T application/json -H "Authorization: Bearer USER_TOKEN" -v 2 http://<server_ip>:9000/api/v1/users
```

---

Anterior: [Testes](tests.md)

Próximo: [Requisições](requests.md)
