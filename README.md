# Backoffice App

## Descrição

Aplicação de **backoffice** desenvolvida em **Angular** com **Angular Material**, permitindo gerenciar clientes com operações de **CRUD** (Criar, Ler, Atualizar, Deletar). A interface segue padrões de usabilidade de sistemas corporativos.

---

## Funcionalidades

- Listagem de clientes em tabela responsiva.
- Pesquisa e filtro de clientes.
- Inclusão e edição de clientes via modal com validação de campos.
- Exclusão de clientes com modal de confirmação.

---

## Tecnologias

- Angular v15  
- Angular Material  
- TypeScript  
- JSON Server (simulação de API RESTful)  

---

## Estrutura do Projeto

src/app/
├─ clientes/
│ ├─ clientes-lista/
│ ├─ clientes-dialog/
├─ app.component.ts/html
└─ app.module.ts
db.json
proxy.conf.json


---

## Execução

1.Instalar dependências:
```bash
npm install

2.Iniciar JSON Server (API simulada):
```bash
npm run start:json-server

3.Iniciar a aplicação Angular:
```bash
npm start

---

Angular App: http://localhost:4200

JSON Server: 
GET http://localhost:3000/clientes
GET http://localhost:3000/clientes/:id
POST http://localhost:3000/clientes
PUT http://localhost:3000/clientes/:id
DELETE http://localhost:3000/clientes/:id



