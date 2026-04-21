# Sistema Básico de Cadastro de Clientes (Node.js + MySQL)

Projeto simples para cadastrar clientes com os campos:
- **Nome**
- **Cidade**
- **Nível**
- **Atualização**

---

## Opção A) Rodar com Docker Compose (recomendado)

### Requisitos
- Docker
- Docker Compose

### Subir aplicação + banco
```bash
docker compose up --build
```

Depois, acesse:
- App: [http://localhost:3000](http://localhost:3000)
- MySQL: `localhost:3306` (usuário `root`, senha `root`)

### Parar os containers
```bash
docker compose down
```

### Parar e remover volume do banco (reset total)
```bash
docker compose down -v
```

> O schema (`sql/schema.sql`) é carregado automaticamente pelo container MySQL na primeira inicialização do volume.

---

## Opção B) Rodar localmente sem Docker

## 1) Requisitos
- Node.js 18+
- MySQL 8+ (ou compatível)

## 2) Instalação
1. Clone/baixe a pasta do projeto.
2. Instale as dependências:

```bash
npm install
```

3. Copie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

4. Edite o `.env` com os dados do seu MySQL.

## 3) Criar banco e tabela
Execute o script SQL abaixo no seu MySQL:

```bash
mysql -u root -p < sql/schema.sql
```

## 4) Rodar a aplicação
### Produção
```bash
npm start
```

### Desenvolvimento (reinício automático)
```bash
npm run dev
```

Acesse em: [http://localhost:3000](http://localhost:3000)

---

## Estrutura
- `server.js`: inicialização do Express
- `db.js`: conexão com MySQL (pool)
- `routes/clientes.js`: rotas de listagem e cadastro
- `views/index.ejs`: tela com formulário e tabela
- `public/style.css`: estilo da interface
- `sql/schema.sql`: criação do banco/tabela
- `Dockerfile`: imagem da aplicação Node.js
- `docker-compose.yml`: orquestra app + MySQL

## Observações
- O campo **Atualização** usa `datetime-local` no formulário.
- Em caso de erro de conexão, revise as credenciais no `.env` e verifique se o MySQL está ativo.
