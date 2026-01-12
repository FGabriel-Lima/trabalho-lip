-- Baseline migration for existing database
-- This creates the minimal schema to match current database state

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "course" TEXT,
    "institution" TEXT,
    "semester" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "disciplines" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'book',
    "color" TEXT NOT NULL DEFAULT 'blue',
    "description" TEXT,
    "totalHours" INTEGER NOT NULL DEFAULT 0,
    "revisionsDone" INTEGER NOT NULL DEFAULT 0,
    "revisionsTotal" INTEGER NOT NULL DEFAULT 0,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "revisions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "topic" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "difficulty" TEXT NOT NULL DEFAULT 'Médio',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "durationMinutes" INTEGER,
    "userId" TEXT NOT NULL,
    "disciplineId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "disciplines_userId_idx" ON "disciplines"("userId");
CREATE INDEX IF NOT EXISTS "revisions_userId_idx" ON "revisions"("userId");
CREATE INDEX IF NOT EXISTS "revisions_date_idx" ON "revisions"("date");
CREATE INDEX IF NOT EXISTS "revisions_disciplineId_idx" ON "revisions"("disciplineId");

