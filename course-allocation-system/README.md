# Course Allocation System

A full-stack, AI-driven course allocation and student registration system. Built with Next.js, Bun, Express, and PostgreSQL in a Turborepo monorepo architecture.

## 🚀 Quick Start (Docker - Recommended)

The easiest way to run the entire stack (Database, Backend, and Frontend) is using Docker Compose. This ensures you don't have to manually configure databases or install dependencies.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running with Docker Compose

1. **Start the project in the background:**
   Open your terminal in the root of the project and run:
   ```bash
   docker compose up --build -d
   ```
   *(Note: On older Docker installations, use `docker-compose up --build -d`)*

2. **Access the application:**
   - **Frontend (Web UI):** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:4000/api](http://localhost:4000/api)
   - **Database:** `postgresql://admin:admin@localhost:5432/course_allocation`

3. **Check the logs:**
   If you want to see what is happening across all containers:
   ```bash
   docker compose logs -f
   ```

4. **Stop the project:**
   ```bash
   docker compose down
   ```

*Note: The Docker setup is fully automated. When you run `docker compose up`, it will automatically create the PostgreSQL database, push the Prisma schema, seed the initial data, and start both the backend and frontend servers.*

---

## 💻 Local Development (Without Docker)

If you prefer to run the project natively on your machine without Docker, follow these steps:

### Prerequisites
- [Bun](https://bun.sh/) (v1.0+)
- PostgreSQL (running locally or remotely)

### 1. Install Dependencies
From the root of the project, let Bun install dependencies for all workspaces:
```bash
bun install
```

### 2. Configure Environment Variables
You need a PostgreSQL database. 
Update the `DATABASE_URL` in `apps/backend/src/config/env.ts` or set it in your local `.env` file at the root:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/course_allocation?schema=public"
```

### 3. Database Setup
Push the schema to your database and generate the Prisma Client:
```bash
cd packages/db
bunx prisma db push
bunx prisma generate
```

*(Optional) Seed the database with initial test data:*
```bash
bun run seed.ts
```

### 4. Start the Development Servers
From the root of the project, you can use Turborepo to start both the frontend and backend simultaneously:
```bash
bun run dev
```

Alternatively, you can start them individually:
- **Frontend only:** `cd apps/web && bun run dev`
- **Backend only:** `cd apps/backend && bun run dev`

---

## 🏗️ Architecture & Tech Stack

This project is a monorepo managed by **Turborepo** with the following workspaces:

- **`apps/web`**: Next.js 16 Frontend (React 19, TailwindCSS v4, Zustand, Shadcn UI)
- **`apps/backend`**: Express.js REST API running on Bun
- **`packages/db`**: Shared Prisma ORM and database schemas

### Features Included
- **Admin Dashboard**: Manage courses, allocations, and view AI-driven reports.
- **Student Portal**: Students can register, log in, view courses, and set course preferences.
- **AI Allocation Engine**: Automated merit and category-based course allocation.
- **Security**: JWT-based authentication synced securely with cookies.
- **Optimized Dockerization**: Utilizes `turbo prune` for lightning-fast, multi-stage Docker builds.

---

## 📦 Mandatory Deliverables Submission

Below is the required documentation addressing the mandatory deliverables for this project submission.

### 1. Source Code Repository
**Included in Submission:** The complete Turborepo codebase containing the frontend, backend, and database packages.

### 2. Database Schema
**Included in Submission:** Found in `packages/db/prisma/schema.prisma`.
- **User Table:** Handles unified authentication (Admin & Student roles).
- **Student Table:** Stores student profiles (marks, category).
- **Course Table:** Stores course details and category-wise seat limits.
- **Preference Table:** Maps student course preferences with priorities (1-3).
- **Allocation Table:** Stores final allocation results and the allocated category.

### 3. README with Setup Instructions
**Included in Submission:** This document serves as the setup instruction guide. (See [Quick Start](#-quick-start-docker---recommended) above).

### 4. API Documentation
**Included in Submission:** The backend REST API endpoints are logically structured in `apps/backend/src/routes`.
- `POST /api/auth/admin/login` - Admin authentication
- `POST /api/auth/student/login` - Student authentication
- `POST /api/auth/student/signup` - Public student registration
- `GET /api/courses` - Public course listing
- `GET /api/students` - Admin view of all students
- `POST /api/allocations/run` - Triggers the AI allocation engine

### 5. Sample Dataset(s)
**Included in Submission:** Found in `packages/db/seed.ts`.
- The dataset automatically seeds **1 Admin**, **3 Courses**, and **10 Students** (across General, OBC, SC, ST categories with varying marks and preferences) into the database upon startup.

### 6. Screenshots or Demo Video
**Project Demo Video:**
<video width="100%" controls>
  <source src="https://github.com/Hari-Oggy/Harveedesigntasks/raw/main/course-allocation-system/imagesandrecordvedio/Screencast%20from%202026-07-11%2014-06-12.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

**System Screenshots:**
![Screenshot 1](imagesandrecordvedio/Screenshot%202026-07-11%20at%2014-05-27%20AI-Powered%20Course%20Allocation%20System.png)
![Screenshot 2](imagesandrecordvedio/brave_screenshot_localhost.png)
![Screenshot 3](imagesandrecordvedio/image1.png)

---

### 7. Brief Architecture Document

#### Architecture Design
The system utilizes a modern, highly decoupled monorepo architecture managed by **Turborepo**. 

```mermaid
graph TD
    User([User / Browser])
    Proxy[Next.js Middleware Proxy]
    Frontend[Next.js 16 Frontend apps/web]
    Backend[Express.js API Backend apps/backend]
    Prisma[Prisma ORM packages/db]
    DB[(PostgreSQL)]
    AI[LLM Agent Groq/OpenAI]
    
    User -->|HTTP Requests| Proxy
    Proxy -->|Validates Auth| Frontend
    Frontend -->|REST API Calls| Backend
    Backend -->|Database Queries| Prisma
    Prisma -->|SQL / TCP| DB
    Backend -->|Context & Prompts| AI
```

- **Frontend (`apps/web`)**: Built with **Next.js 16** and **Tailwind CSS v4** for SSR and high-performance client rendering. It uses Zustand for local state management and Shadcn UI for a polished user experience.
- **Backend (`apps/backend`)**: A highly optimized **Express.js API** running on **Bun**. It is fully typed with TypeScript and uses Zod for strict runtime payload validation.
- **Shared DB (`packages/db`)**: Extracts the **Prisma ORM** layer into a shared package, ensuring a single source of truth for database types across the monorepo.
- **Infrastructure**: Containerized using multi-stage Docker builds optimized with `turbo prune` for lightning-fast CI/CD and deployment.

#### Database Design Decisions
- **Normalized Architecture**: Data is heavily normalized to prevent anomalies. `Users` are separated from `Students` to allow admins to exist without a student profile.
- **Cascading Relations**: Deleting a student automatically cleans up their preferences and allocations.
- **Indexing**: High-performance sorting is achieved by indexing the `Student` table on `[marks(desc), applicationDate(asc)]` because this is the exact criteria the allocation engine needs to sort by.

#### AI Integration Approach
- The system integrates an LLM agent (via `groq-sdk` / OpenAI standards).
- **Context Injection**: The backend dynamically fetches live allocation statistics from the PostgreSQL database and injects them into the AI's system prompt context. 
- **Analytical Reporting**: This allows the AI to accurately answer complex administrative questions in natural language, such as calculating course rejection rates or summarizing category distributions.

#### Security Considerations
- **Secure Authentication**: Passwords are cryptographically hashed using `bcryptjs`. 
- **Token Handling**: JWTs are used for stateless authentication. In the frontend, tokens are synced to strict HTTP Cookies.
- **Edge Route Protection**: A Next.js middleware proxy (`proxy.ts`) securely intercepts all page loads, validating the HTTP Cookies to prevent students from accessing admin pages and vice-versa, avoiding client-side spoofing.

#### Challenges Faced and Solutions Implemented
- **Challenge:** Next.js Server Components struggling to read `localStorage` JWTs during initial page loads, causing infinite redirect loops between login and dashboard screens.
- **Solution:** Implemented an isomorphic authentication sync where the client `fetcher` manually writes the JWT into a `document.cookie`. The Next.js server-side `middleware` then reads this cookie to accurately verify session state before rendering the page.
- **Challenge:** Dockerizing a Turborepo locally pulled in massive `node_modules`, blowing up image sizes and build times.
- **Solution:** Implemented the `turbo prune` command in a multi-stage Docker build, which intelligently extracts only the specific files required for the target application, resulting in tiny, fast, and cache-optimized Docker images.
