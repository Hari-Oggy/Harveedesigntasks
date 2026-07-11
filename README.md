# Harvee Projects Portfolio

Welcome to the Harvee projects repository! This repository contains two major AI-powered web applications built with modern web technologies. 

Below you will find a brief overview of each project along with their respective demonstration videos.

---

## 1. Course Allocation System (`course-allocation-system`)

The **Course Allocation System** is a full-stack, AI-driven platform for automating student registrations and course allocations. Built as a Turborepo monorepo, it leverages **Next.js 16**, **Express/Bun**, and **PostgreSQL** with Prisma.

**Key Features:**
- Unified Admin and Student Portals.
- AI-driven merit and category-based course allocation engine.
- High-performance, highly decoupled monorepo architecture.
- Secure JWT-based authentication.

**Project Demo Video:**

<video width="100%" controls>
  <source src="https://github.com/Hari-Oggy/Harveedesigntasks/raw/main/course-allocation-system/imagesandrecordvedio/Screencast%20from%202026-07-11%2014-06-12.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

*For full details, setup instructions, and architecture design, please view the [Course Allocation System README](./course-allocation-system/README.md).*

---

## 2. AI SQL Assistant (`aisql`)

The **AI SQL Assistant** is a tool that allows users to upload any CSV or Excel dataset and query it in **plain English**. It utilizes a FastAPI backend and a Vite React frontend, seamlessly translating natural language questions into secure PostgreSQL queries using cutting-edge LLMs (like Groq, NVIDIA NIM, or OpenRouter).

**Key Features:**
- Drag & Drop Dataset Upload (CSV/Excel) with dynamic schema detection.
- Multi-provider LLM support for generating optimized SQL queries.
- Multi-layer AST validation to prevent destructive SQL injections.
- Beautiful results table with CSV export functionality.

**Project Demo Video:**

<video width="100%" controls>
  <source src="https://github.com/Hari-Oggy/Harveedesigntasks/raw/main/aisql/video/Screencast%20from%202026-07-11%2018-41-23.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

*For full details, setup instructions, and architecture design, please view the [AI SQL Assistant README](./aisql/README.md).*
