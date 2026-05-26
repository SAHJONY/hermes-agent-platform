// Update owner password script
const bcrypt = require('bcryptjs')

async function updatePassword() {
  const { PrismaClient } = require('@prisma/client')
  const prisma = new PrismaClient()

  try {
    const newPassword = 'Primelles208#'
    const passwordHash = await bcrypt.hash(newPassword, 12)
    
    const owner = await prisma.user.update({
      where: { email: 'sahjonycapitalllc@outlook.com' },
      data: {
        passwordHash,
        name: 'Juan Gonzalez',
      },
    })

    console.log('Owner password updated successfully!')
    console.log('Email:', owner.email)
    console.log('Name:', owner.name)
    console.log('Role:', owner.role)
    
  } catch (error) {
    console.error('Update error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updatePassword()