# TODO - Refatoração para Banco de Dados Real

## 1. Modelagem do Banco de Dados (schema.prisma)
- [x] Atualizar `prisma/schema.prisma` com models corretos
  - [x] Model User (com todos os campos do profile)
  - [x] Model Discipline (com icon, color, totalHours, etc)
  - [x] Model Revision (completo)
  - [x] Relacionamentos corretos

## 2. Configuração do Cliente Prisma
- [ ] Completar `lib/prisma.ts` com singleton pattern

## 3. Server Actions (Backend Logic)
- [ ] Criar `app/actions/disciplinas.ts`
  - [ ] getDisciplines(userId)
  - [ ] createDiscipline(data)
  - [ ] deleteDiscipline(id)
- [ ] Criar `app/actions/revisions.ts`
  - [ ] getRevisions(userId)
  - [ ] createRevision(data)
  - [ ] toggleRevisionCheck(id)
- [ ] Atualizar `app/actions/profile.ts`
  - [ ] getUserProfile(userId)
  - [ ] updateUserProfile(data)

## 4. Refatoração do Frontend
- [ ] Refatorar `app/disciplinas/page.tsx`
  - [ ] Buscar dados iniciais do banco
  - [ ] Substituir useState por Server Actions
- [ ] Refatorar `app/agenda/page.tsx`
  - [ ] Buscar dados iniciais do banco
  - [ ] Substituir useState por Server Actions
- [ ] Refatorar `app/perfil/page.tsx`
  - [ ] Buscar dados iniciais do banco
  - [ ] Substituir useState por Server Actions

## 5. Testes e Validação
- [ ] Executar `npx prisma generate`
- [ ] Executar migração se necessário
- [ ] Testar aplicação

