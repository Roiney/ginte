# Usa a imagem do Node.js com Alpine (leve e rápida)
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app-frontend

# Expõe a porta do React
EXPOSE 3000

# Copia apenas arquivos essenciais para melhorar o cache da build
COPY package.json  yarn.lock ./

# Instala dependências (sem cache para evitar problemas)
RUN npm install 

# Copia o restante dos arquivos
COPY . .

# Formata código (se necessário)
RUN npm run format || true

# Inicia o servidor de desenvolvimento do React
CMD ["npm", "start"]
