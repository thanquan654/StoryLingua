# StoryLingua

**StoryLingua** is an interactive language learning platform designed to help users improve their reading comprehension and vocabulary through engaging storytelling. The project blends contextual learning with gamification elements to create an immersive and motivating educational experience.

## ✨ Key Features

-   **Story Library:** Access a diverse collection of stories tailored to various difficulty levels.
-   **Vocabulary Builder:** Save and review new words encountered during reading sessions.
-   **Shop & Mascots:** A gamified ecosystem where users can earn rewards, purchase items, and collect mascots to personalize their journey.
-   **Secure Authentication:** Robust user registration and login system (JWT-based).
-   **Interactive Dashboard:** Track learning progress, manage your profile, and see your growth over time.
-   **PWA Ready:** Progressive Web App support for a seamless, app-like experience on mobile and desktop.

## 🛠️ Tech Stack

The project is built as a Monorepo using modern, industry-standard technologies:

### Frontend (`/frontend`)

-   **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS & Lucide Icons
-   **UI Components:** Shadcn UI / Radix UI
-   **PWA:** Service Workers & Web App Manifest

### Backend (`/backend`)

-   **Runtime:** Node.js
-   **Framework:** Express.js (TypeScript)
-   **Database ORM:** [Prisma](https://www.prisma.io/)
-   **Database:** PostgreSQL
-   **Security:** JWT Authentication & Rate Limiting

### Infrastructure

-   **Containerization:** Docker & Docker Compose

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18+)
-   Docker & Docker Compose
-   Git

### Option 1: Running with Docker (Recommended)

The project is pre-configured with `docker.compose.yaml` to spin up the entire stack (Frontend, Backend and Database) with a single command.

```bash
# 1. Clone the repository
git clone https://github.com/thanquan654/StoryLingua.git
cd StoryLingua

# 2. Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Start the application
docker compose up -d
```

### Option 2: Manual Development Setup

#### Backend

```bash
cd backend
npm install
# Configure your .env then run migrations
npx prisma migrate dev
npx prisma generate

npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📂 Project Structure

```
StoryLingua/
├── backend/                # Server-side logic, API, Database schema
│   ├── prisma/             # Database migrations & schema
│   ├── src/
│   │   ├── api/            # Controllers, Routes, Services (Auth, Stories, Users)
│   │   ├── config/         # Environment variables & constants
│   │   └── middlewares/    # Error handling, Auth, Rate limiters
├── frontend/               # Client-side Next.js application
│   ├── src/
│   │   ├── app/            # App Router pages & API routes
│   │   ├── components/     # Reusable UI & Layout components
│   │   ├── lib/            # Shared utilities & API client
│   │   └── services/       # API abstraction layer
└── docker.compose.yaml     # Container orchestration
```

---

_This project is currently under active development._
