# 🏆 Desafio Técnico – CRUD de Cadastro de Clientes

Este projeto é um **CRUD** completo para gerenciamento de clientes, desenvolvido com **React** no frontend e **Next.js** no backend. Ele permite **criar, visualizar, editar e excluir clientes**, além de fornecer **listagem paginada** e um **campo de busca** para filtrar clientes pelo nome ou e-mail.

## 🚀 Tecnologias Utilizadas

- **Frontend:** React 
- **Backend:** API em Nest.js (Node.js)
- **Banco de Dados:** PostgreSQL 
- **Autenticação:** JWT (JSON Web Token)
- **Containerização:** Docker + Docker Compose
- **Validação de Formulários:** Yup / Zod
- **Testes:** Jest / Testing Library (se aplicável)

---

## 📌 **Funcionalidades**

✅ **CRUD de Clientes** (Criar, visualizar, editar e excluir)  
✅ **Listagem paginada de clientes**  
✅ **Campo de busca para filtrar clientes por nome ou e-mail**  
✅ **Autenticação por email/senha**  
✅ **Banco de dados totalmente gerenciado pelo Docker**  

### 🎯 **Diferenciais implementados**
- ✅ **Uso de TypeScript**
- ✅ **Autenticação via JWT**
- ✅ **Banco de dados rodando no Docker**
- ✅ **Arquitetura organizada e escalável**
- ✅ **Boas práticas de desenvolvimento**

---

## 🔧 **Como rodar o projeto?**

> O projeto está pronto para ser executado via **Docker Compose**!  
>
> **Basta rodar um único comando e tudo será iniciado automaticamente.** 🎉  

### **1️⃣ Passo: Execute o comando abaixo**

docker compose -f 'app/docker-compose.yml' up -d --build

Este comando irá:

- Criar e configurar o banco de dados  
- Iniciar o backend (Next.js API)  
- Iniciar o frontend (React)  

### **2️⃣ Passo: Acesse a aplicação**  
Após o Docker concluir a inicialização, basta acessar no navegador:

🔗 **http://localhost:3001/**  

### **3️⃣ Passo: Faça login**  
Utilize as seguintes credenciais para acessar o sistema:

📧 **Email:** `admin@ginte.com`  
🔑 **Senha:** `admin123`  

---

## 📂 **Estrutura do Projeto**

A estrutura do projeto segue um padrão modular para melhor organização:

```bash
/app
 ├── /backend           # Backend Next.js (API)
 ├── /frontend          # Frontend React
 ├── /database          # Configuração do banco de dados
 ├── docker-compose.yml # Orquestração dos serviços no Docker
 ├── README.md          
