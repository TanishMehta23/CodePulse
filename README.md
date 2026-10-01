<div align="center">

<img src="https://img.shields.io/badge/CodePulse-Online%20Compiler-orange?style=for-the-badge&logo=code&logoColor=white" alt="CodePulse" />

# CodePulse

**A fast, modern online compiler — write, run, and share code instantly.**  
Supports Java, C++, Python, and JavaScript with a Monaco-powered editor, run history, and favorites — all in one clean interface.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql)](https://neon.tech)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat-square&logo=docker)](https://docker.com)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)

</div>

---

## Features

| Feature | Description |
|---|---|
| **Instant Execution** | Run code in real-time with sub-second feedback |
| **4 Languages** | Java 17, C++ (GCC / build-essential), Python 3, JavaScript (Node.js) |
| **Monaco Editor** | The same editor that powers VS Code — with syntax highlighting |
| **Run History** | Automatically saves your last 10 runs per user |
| **Favorites** | Bookmark up to 5 code snippets for quick access |
| **Auth** | JWT-based signup & login with bcrypt password hashing |
| **Theme Switcher** | Light, Dark, and System theme — persisted via localStorage |
| **stdin Support** | Pass custom input to your programs |
| **Sandboxed** | 8-second execution timeout + 2MB output cap per run |
| **Vercel Analytics** | Built-in page view tracking |

---

## Architecture

```
CodePulse/
├── frontend/          # React + Vite + TailwindCSS v4
│   └── src/
│       ├── pages/     # Home, Compiler, History, Favorites, Login, Signup
│       ├── components/ # Navbar, Sidebar, Footer
│       ├── context/   # ThemeContext (light/dark/system)
│       └── config/    # api.js — VITE_API_URL resolver
│
└── backend/           # Node.js + Express 5
    ├── routes/
    │   ├── authRoutes.js     # POST /api/auth/signup, /login
    │   ├── compileRoutes.js  # POST /api/compile
    │   ├── historyRoutes.js  # GET/DELETE /api/history
    │   └── favoriteRoutes.js # GET/POST/DELETE /api/favorites
    ├── middleware/
    │   └── authMiddleware.js # JWT Bearer token verification
    ├── prisma/
    │   └── schema.prisma     # User, RunHistory, Favorite models
    ├── server.js             # Express app entry point
    └── Dockerfile            # Multi-language runtime container
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Role |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite 8](https://vitejs.dev) | Build tool & dev server |
| [TailwindCSS v4](https://tailwindcss.com) | Utility-first styling |
| [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react) | Code editor |
| [React Router v7](https://reactrouter.com) | Client-side routing |
| [Axios](https://axios-http.com) | HTTP client |
| [Lucide React](https://lucide.dev) | Icon library |
| [@vercel/analytics](https://vercel.com/analytics) | Page analytics |

### Backend
| Technology | Role |
|---|---|
| [Node.js 20](https://nodejs.org) | Runtime |
| [Express 5](https://expressjs.com) | Web framework |
| [Prisma 7](https://prisma.io) | ORM + migrations |
| [PostgreSQL (Neon)](https://neon.tech) | Serverless database |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Password hashing |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | JWT auth |
| [Docker](https://docker.com) | Containerized compiler runtime |

### Compilers (inside Docker)
| Language | Runtime |
|---|---|
| Java | `openjdk-17-jdk-headless` |
| C++ | `build-essential` (GCC/G++) |
| Python | `python3` |
| JavaScript | `node` (same container) |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Docker (for backend — includes all compilers)
- A PostgreSQL database (e.g., [Neon](https://neon.tech) — free tier)

---

### 1. Clone the repository

```bash
git clone https://github.com/TanishMehta23/CodePulse.git
cd CodePulse
```

---

### 2. Backend Setup

```bash
cd backend
```

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
```

Install dependencies and run migrations:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

**Run with Docker (recommended — includes Java, C++, Python):**

```bash
docker build -t codepulse-backend .
docker run -p 5000:5000 --env-file .env codepulse-backend
```

**Run locally (Node.js only — Java/C++ need to be installed separately):**

```bash
npm run server   # uses nodemon for auto-reload
```

---

### 3. Frontend Setup

```bash
cd frontend
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Install and run:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Deployment

### Frontend → Vercel

1. Push your code to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   ```
   VITE_API_URL = https://your-backend-url.com
   ```
5. Vercel auto-builds with `vite build` and uses `frontend/vercel.json` for SPA routing

### Backend → Railway / Render / VPS

The backend ships with a `Dockerfile` that installs all compilers. Deploy to any Docker-compatible platform.

**Railway:**
1. New Project → Deploy from GitHub repo
2. Set root directory to `backend`
3. Add environment variables (`DATABASE_URL`, `JWT_SECRET`)
4. Railway auto-detects the Dockerfile and builds

**Render:**
1. New Web Service → Docker
2. Set `Root Directory` to `backend`
3. Add environment variables
4. Deploy

**Environment variables required on the backend host:**

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `PORT` | Port to listen on (default: `5000`) |
| `JAVA_HOME` | *(Optional)* Auto-detected from `which javac` |

---

## API Reference

All protected routes require:
```
Authorization: Bearer <token>
```

### Auth

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | `{ name, email, password }` | Register a new user |
| `POST` | `/api/auth/login` | `{ email, password }` | Login and receive a JWT |

### Compile

| Method | Endpoint | Body | Auth | Description |
|---|---|---|---|---|
| `POST` | `/api/compile` | `{ language, code, input? }` | ✅ | Execute code; auto-saves to history |

**Supported `language` values:** `java`, `cpp`, `python`, `javascript`

**Response:**
```json
{ "output": "Hello, World!", "type": "success" }
{ "output": "Main.java:5: error: ';' expected", "type": "error" }
```

### History

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/history` | ✅ | Get last 10 runs |
| `DELETE` | `/api/history/:id` | ✅ | Delete a specific run |
| `DELETE` | `/api/history` | ✅ | Clear all history |

### Favorites

| Method | Endpoint | Body | Auth | Description |
|---|---|---|---|---|
| `GET` | `/api/favorites` | — | ✅ | Get all favorites |
| `POST` | `/api/favorites` | `{ language, code, input? }` | ✅ | Save a favorite (max 5) |
| `DELETE` | `/api/favorites/:id` | — | ✅ | Remove a favorite |

---


## Database Schema

```prisma
model User {
  id           String        @id @default(cuid())
  name         String
  email        String        @unique
  passwordHash String
  runHistory   RunHistory[]
  favorites    Favorite[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model RunHistory {
  id        String   @id @default(cuid())
  userId    String
  language  String
  code      String
  input     String   @default("")
  output    String   @default("")
  status    String   // "success" | "error"
  createdAt DateTime @default(now())

  @@index([userId, createdAt])
}

model Favorite {
  id        String   @id @default(cuid())
  userId    String
  language  String
  code      String
  input     String   @default("")
  createdAt DateTime @default(now())

  @@index([userId, createdAt])
}
```

---

## Execution Limits

| Limit | Value |
|---|---|
| Execution timeout | 8 seconds |
| Output buffer | 2 MB |
| History per user | 10 most recent runs |
| Favorites per user | 5 |

Each code submission runs in an **isolated temp directory** that is cleaned up after execution.

---

## Key Files

| File | Purpose |
|---|---|
| `backend/server.js` | Express app bootstrap, CORS, route mounting |
| `backend/Dockerfile` | Multi-language Docker image (Java 17, GCC, Python 3) |
| `backend/routes/compileRoutes.js` | Core compilation logic for all 4 languages |
| `backend/prisma/schema.prisma` | Database models |
| `frontend/src/pages/Compiler.jsx` | Main editor page with Monaco + sidebar |
| `frontend/src/context/ThemeContext.jsx` | Light/Dark/System theme provider |
| `frontend/src/config/api.js` | Resolves `VITE_API_URL` at runtime |
| `frontend/vercel.json` | SPA rewrite rules for Vercel |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to your branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/TanishMehta23">Tanish Mehta</a>
</div>
