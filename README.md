# 📱 Make it Better
## Um sistema de gerenciamento de tarefas e recompensas familiar 

Um sistema full-stack para gerenciamento de tarefas e recompensas familiares, desenvolvido com React Native (Web), FastAPI (backend) e MongoDB.
Este projeto foi desenvolvido como Trabalho de Conclusão de Curso para a Pós-graduação em Desenvolvimento Web FullStack da PUC-RS.

## 📋 Índice
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#️--tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)
- [Rotas Principais (API)](#-rotas-principais-api)
- [Contato](#️-contato))

## 🚀 Funcionalidades

- Autenticação segura com Firebase e JWT
- CRUD de tarefas com filtros por dia/semana/mês
- Sistema de recompensas com resgate por pontos
- Grupos familiares com múltiplos membros
- Dashboard intuitivo com progresso visual

## 🛠️  Tecnologias

### Frontend (Web)

- React Native
- Context API (gerenciamento de estado)
- Axios (chamadas à API)
- Firebase Authentication
- React Navigation

### Backend

- Python + FastAPI
- JWT (autenticação)
- Firebase Admin SDK

### Infraestrutura

- MongoDB Atlas
- Firebase (Autenticação)
- Docker (será implementado para o deploy)

## 📂 Estrutura do Projeto

```
.
├── frontend/             # Aplicativo React Native
│   ├── src/
│   │   ├── api/          # Configuração do cliente HTTP
│   │   ├── app/          # Função App()
│   │   ├── assets/       # Arquivos de fontes e imagens
│   │   ├── components/   # Componentes customizados para a aplicação
│   │   ├── hooks/        # Hooks customizados
│   │   ├── navigation/   # Navegação da aplicação
│   │   ├── screens/      # Telas (Login, Tasks, Rewards, etc.)
│   │   └── services/     # Autenticação, storage
│   │
│   ├── firebase.ts       # Funções de comunicação com o Firebase
│   └── firebase_data.ts  # Secrets do Firebase
│
├── backend/              # API FastAPI
│   ├── app/
│   │   ├── crud/                 # Funções de manipulação de DB
│   │   ├── db/                   # Conexão com MongoDB
│   │   ├── models/               # Schemas Pydantic
│   │   ├── routes/               # Endpoints (auth, tasks, families)
│   │   └── utils/                # Autenticação, segurança
│   │
│   └── config/                   
│       ├── requirements.txt      # Dependências Python
│       └── firebase-config.json  # Secrets do Firebase
│
└── README.md             # Este arquivo
```

## 🚀 Instalação

### Backend

1. **Instale as dependências:**
```bash
cd backend
pip install -r config/requirements.txt
```

2. **Copie o arquivo `.env.example` para `.env` e edite o com suas credenciais**
```bash
cp app/.env.example app/.env
```

3. **Inicie o servidor**
```bash
fastapi dev app/main.py 
```

### Frontend

1. **Instale as dependências:**
```bash
cd frontend
npm install
```

2. **Configure o Firebase no arquivo firebase_data.ts:**
```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
```

3. **Execute a aplicação**
```bash
npm run web
```


## 🌟 Rotas Principais (API)

|  Método   |     Rota                            |              Descrição                   |
|-----------|-------------------------------------|------------------------------------------|
|  POST     | /auth/login                         |	Login com Firebase (retorna JWT)       |
|  POST	   | /auth/register                      |	Cria um usuário com login e senha      |
|  GET	   | /users/{user_id}                    |	Recupera os dados de um usuário        |
|  GET	   | /users/by_family_id/{family_id}     |	Recupera usuários de um grupo familiar |
|  PUT	   | /users/{user_id}                    |	Atualiza os dados de um usuário        |
|  POST	   | /families                           |	Cria um novo grupo familiar            |
|  GET	   | /families/{family_id}               |	Recupera dados de um grupo familiar    |

## ✉️ Contato

- Desenvolvedor: Aristóteles Soares Benício Júnior
- Email: aristoteles88@gmail.com
- LinkedIn: http://www.linkedin.com/in/aristoteles-benicio-jr
