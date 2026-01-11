# 📘 StudySpace - Dashboard de Gestão de Estudos

O **StudySpace** é uma plataforma desenvolvida para centralizar a gestão do progresso acadêmico. Este projeto foi concebido dentro do contexto acadêmico de engenharia de software para oferecer uma visão clara sobre disciplinas e carga horária de estudos.

---

## 🚀 Tecnologias

A aplicação utiliza uma stack moderna e robusta para garantir alta performance e facilidade de manutenção:

* **Framework:** Next.js 15+ (com Turbopack).
* **UI/UX:** shadcn/ui & Tailwind CSS.
* **ORM:** Prisma ORM.
* **Banco de Dados:** SQLite (Armazenamento local em arquivo `.db`).
* **Iconografia:** Lucide React.

---

## 🛠️ Configuração do Ambiente

Siga as instruções abaixo para rodar o projeto localmente:

### 1. Clonar o repositório
```bash
git clone [https://github.com/seu-usuario/study-space.git](https://github.com/seu-usuario/study-space.git)
cd study-space
```

### 2. Instalar as dependências
```Bash
npm install
```
### 3. Configurar as Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto:

```.env

DATABASE_URL="file:./dev.db"
```
### 4. Inicializar o Banco de Dados (Prisma)
Como o projeto utiliza SQLite, você precisa gerar o cliente e rodar as migrações iniciais:

```Bash
npx prisma generate
npx prisma migrate dev --name init
```
### 5. Executar o servidor
```Bash
npm run dev
```
Acesse http://localhost:3000 no seu navegador.

## 💡 Comandos Úteis
``npx prisma studio``: Abre uma interface web para visualizar e editar os dados do seu banco SQLite local.

``npx prisma migrate dev``: Aplica novas alterações feitas no arquivo schema.prisma ao banco de dados.