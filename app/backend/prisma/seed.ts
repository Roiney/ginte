import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 🔐 Criptografando a senha do usuário root
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // ✅ Criando o usuário ROOT
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

  // 📌 Criando 3 clientes demo
  const demoClients = [
    {
      fullName: 'Cliente Demo 1',
      email: 'cliente1@demo.com',
      phone: '(11) 99999-9999',
      birthDate: '1990-01-15',
      address: 'Rua Exemplo, 123 - São Paulo, SP',
    },
    {
      fullName: 'Cliente Demo 2',
      email: 'cliente2@demo.com',
      phone: '(21) 88888-8888',
      birthDate: '1985-07-10',
      address: 'Av. Central, 456 - Rio de Janeiro, RJ',
    },
    {
      fullName: 'Cliente Demo 3',
      email: 'cliente3@demo.com',
      phone: '(31) 77777-7777',
      birthDate: '2000-03-20',
      address: 'Rua Teste, 789 - Belo Horizonte, MG',
    },
  ];

  for (const client of demoClients) {
    await prisma.gntClient.upsert({
      where: { email: client.email },
      update: {},
      create: {
        ...client,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  console.log('✅ Clientes demo criados!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao rodar o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
