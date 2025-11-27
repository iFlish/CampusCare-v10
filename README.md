Here is your clean, ready-to-use **README.md** for your GitHub repo.
You can copy–paste it directly into your repository.

---

# 🚀 AI Chatbot (React + Node.js + Gemini + MongoDB)

This repository contains a full-stack AI chatbot built using **React (Vite)** for the frontend and **Node.js + Express** for the backend.
It integrates **Google Gemini AI** for natural language responses and uses **MongoDB** to store chat history.

This guide explains how to clone, install, configure, and run the project.

---

## 📌 Features

* ⚡ Fast React (Vite) frontend
* 🔥 Express.js backend with REST API
* 🤖 Gemini AI text generation
* 🗂 MongoDB chat history storage
* 🛡 Environment variable–based configuration
* 🎯 Clean & simple project structure

---

# 🛠️ Requirements

Make sure your system has:

* **Node.js** (v18 or above recommended)
* **npm**
* **MongoDB Atlas** or local MongoDB
* **Gemini API Key** (Google AI Studio)

---

# 📁 Project Structure

```
project-folder/
│
├── client/       # React (Vite) frontend
└── backend/      # Node.js Express backend
```

---

# 🔧 Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

---

# 🔐 2️⃣ Create Environment Variables

Inside the **backend** directory, create a `.env` file:

```
PORT=5000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING_HERE
```

❗ These values **must be filled in manually**.
Without them, the backend will not run.

---

# 📦 3️⃣ Install Dependencies

## Install FRONTEND dependencies

```bash
cd client
npm install
```

## Install BACKEND dependencies

```bash
cd backend
npm install
```

---

# 🚀 Running the Project

You must open **two terminals** in VS Code.

---

### 🖥️ Terminal 1 — Start Frontend

```bash
cd client
npm run dev
```

This starts Vite on something like:

```
http://localhost:5173
```

---

### 🖥️ Terminal 2 — Start Backend

```bash
cd backend
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

# 🎉 Usage

Once **both terminals** are running:

1. Open your browser
2. Go to:

```
http://localhost:5173
```

3. Start chatting with the AI chatbot!

---

# 🧰 Troubleshooting

### ❌ Frontend loads but chatbot does not reply

➡ Backend not running or `.env` missing values.

### ❌ "Invalid API Key"

➡ Your `GEMINI_API_KEY` is wrong or missing.

### ❌ MongoDB connection error

➡ Ensure your `MONGO_URI` is valid & IP is whitelisted in MongoDB Atlas.

---

# 📄 License

This project is open-source and free for personal or educational use.
