import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashed = await bcrypt.hash('password123', 10)
  await prisma.user.create({
    data: {
      username: 'admin',
      password: hashed,
      role: 'admin',
    },
  })
  console.log('✅ Пользователь создан')
}

main()
