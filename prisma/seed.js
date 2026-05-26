// Seed script to create owner account
const bcrypt = require('bcryptjs')

async function seed() {
  const { PrismaClient } = require('@prisma/client')
  const prisma = new PrismaClient()

  try {
    // Create owner user with the provided credentials
    const passwordHash = await bcrypt.hash('Password123!', 12)
    
    const owner = await prisma.user.upsert({
      where: { email: 'sahjonycapitalllc@outlook.com' },
      update: {
        name: 'Juan Gonzalez',
        passwordHash,
        role: 'owner',
      },
      create: {
        email: 'sahjonycapitalllc@outlook.com',
        name: 'Juan Gonzalez',
        passwordHash,
        role: 'owner',
        provider: 'credentials',
      },
    })

    console.log('Owner user created/updated:', owner.email)
    console.log('Role:', owner.role)
    
    // Create a sample workspace for the owner
    const workspace = await prisma.workspace.upsert({
      where: { id: 'owner-workspace-1' },
      update: {},
      create: {
        id: 'owner-workspace-1',
        name: 'Owner Workspace',
        description: 'Primary workspace for platform owner',
        userId: owner.id,
        plan: 'enterprise',
        maxMessages: 1000000,
        maxAgents: 100,
      },
    })

    console.log('Workspace created:', workspace.name)
    console.log('\nOwner login credentials:')
    console.log('Email: sahjonycapitalllc@outlook.com')
    console.log('Password: Password123!')
    
  } catch (error) {
    console.error('Seed error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()