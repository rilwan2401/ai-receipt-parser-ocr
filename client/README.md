# Receipt Parser

A small full-stack web application that allows users to upload receipt images, extract structured receipt data, review and edit extracted fields, and save corrected receipts locally.

---

# Features

* Upload receipt images (JPG/PNG)
* OCR-based receipt text extraction
* Structured receipt parsing
* Editable correction flow
* Save corrected receipts
* Local JSON persistence
* TypeScript backend
* React frontend

---

# Tech Stack

## Frontend

* React
* TypeScript
* Axios
* Vite

## Backend

* Node.js
* Express
* TypeScript
* Tesseract.js
* Multer

---

# Project Structure

```text id="egff5t"
receipt-parser/
│
├── client/
│
├── server/
│   ├── src/
│   ├── uploads/
│   ├── .env.example
│
├── README.md
└── .gitignore
```

---

# Setup Instructions

## Clone Repository

```bash id="g0pllh"
git clone https://github.com/rilwan2401/ai-receipt-parser-ocr.git
```

---

# Backend Setup

```bash id="j12m43"
cd server
npm install
npm run dev
```

Backend runs on:

```text id="0dyciv"
http://localhost:5000
```

---

# Frontend Setup

Open another terminal:

```bash id="4cb3z0"
cd client
npm install
npm run dev
```

Frontend runs on:

```text id="iq5q2r"
http://localhost:5173
```

---

# Environment Variables

Create:

```text id="6v8l7v"
server/.env
```

Current implementation does not require any environment variables because parsing is handled locally using Tesseract OCR.

Example `.env.example`:

```env id="9c7e87"
# No environment variables required
```

---

# What did you build?

I built a small receipt parsing application that allows users to upload receipt images, extract structured receipt data, review and correct extracted fields inline, and save corrected receipts locally. The application focuses primarily on the correction workflow and structured editing experience rather than perfect extraction accuracy.

---

# Biggest tradeoffs made

## 1. OCR-first parsing instead of paid LLM APIs

I initially integrated Gemini-based receipt parsing, but due quota limitations and API reliability issues during development, I switched to a local OCR-first approach using Tesseract.js. This allowed the application to remain fully functional without external API dependencies while preserving the same parsing abstraction layer.

## 2. Prioritized correction UX over extraction accuracy

The assignment emphasized that the correction flow is the most important part of the product. I focused more effort on editable inline correction, structured item editing, and persistence rather than spending excessive time optimizing OCR prompts or extraction heuristics.

## 3. JSON persistence instead of database setup

I used a local JSON file for persistence to reduce setup complexity and keep the project lightweight for local evaluation.

---

# Where did you use LLMs?

# Where did you use LLMs?

I used ChatGPT during development for:
- project scaffolding guidance
- debugging TypeScript and Vite setup issues
- refining parsing flow architecture
- improving correction UX decisions
- troubleshooting Gemini API integration issues

I initially implemented Gemini-based receipt parsing using the Google Generative AI SDK before switching to a local OCR fallback due quota limitations during development.

I wrote and modified the core application logic, frontend state handling, backend routes, and persistence integration manually.

---

# What would you do with another week?

With additional time I would:

* add confidence scoring per field
* highlight uncertain OCR regions visually
* improve receipt item classification
* add drag/drop upload support
* add receipt image previews
* support multiple receipt formats more robustly
* add automated tests
* add SQLite persistence
* improve mobile responsiveness
* reintroduce production-grade LLM extraction with fallback handling

---

# One thing I would push back on

I would push back on treating all receipt parsing failures equally. Different extraction failures have very different UX implications. For example, missing totals are much more critical than imperfect line-item names. I would want clearer product prioritization around which extraction errors matter most to users and how correction effort should be optimized.
