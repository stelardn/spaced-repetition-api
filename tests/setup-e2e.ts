import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll } from 'vitest'

const prisma = new PrismaClient()
const schemaId = randomUUID()
const generateDatabaseURLWithTestSchema = () => {
  const { DATABASE_URL } = process.env

  if (!DATABASE_URL) {
    throw new Error('No DATABASE_URL was provided.')
  }

  const databaseURL = new URL(DATABASE_URL)
  
  databaseURL.searchParams.set('schema', schemaId)

  return databaseURL.toString()
}

beforeAll(async() => {
  config()
  process.env.DATABASE_URL = generateDatabaseURLWithTestSchema()

  execSync('yarn prisma migrate dev')
})

afterAll(async() => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
  config()
})
