import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Criptografando a senha do usuário root
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Criando o usuário ROOT
  const rootUser = await prisma.gntUser.upsert({
    where: { email: 'admin@ginte.com' },
    update: {},
    create: {
      name: 'Root User',
      email: 'admin@ginte.com',
      password: hashedPassword,
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log('✅ Usuário ROOT criado:', rootUser);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao rodar o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
