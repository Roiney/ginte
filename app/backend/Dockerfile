# Usar uma imagem base para Node.js
FROM node:18-bullseye

# Instalar o nc
RUN apt-get update && apt-get install -y netcat

# Install pnpm with corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Configurar o diretório de trabalho
WORKDIR /app-backend

# Copiar os arquivos necessários
COPY package.json pnpm-lock.yaml ./
COPY prisma ./

# Instalar TODAS as dependências (produção e desenvolvimento)
RUN pnpm install

# Gerar o cliente Prisma (necessário para produção)
RUN pnpm prisma generate

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN pnpm run build

# Definir as variáveis de ambiente
ENV PORT=3035 \
    PG_HOST_STORE=db \
    PG_USER_STORE=postgres \
    PG_PASSWORD_STORE=postgres \
    PG_DATABASE_STORE=ginte \
    PG_PORT_STORE=5432 \  
    DATABASE_URL=postgresql://postgres:postgres@db:5432/ginte \
    AUTH_SECRET=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


# Exponha a porta usada pela aplicação
EXPOSE 3000

# Start the server using the production build
CMD ["pnpm", "run", "start:dev"]
