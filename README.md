# 🌐 CCI Platform

## 📦 Overview

This repository contains the frontend UI for **CCI Platform**, built using **[React / Vite / Typescript]**.  
The app is now finalized and deployed.

---

## 🚀 Live Demo

🔗 [Visit the Live Site](https://mincaai-franciamexico.com/)

---

## 🛠️ Tech Stack

- **Framework**: React, Vite, TypeScript
- **Styling**: Tailwind CSS v4, ShadCN UI
- **Routing**: React Router v7
- **State Management**: Zustand, React Hook Form, Zod
- **Data Fetching**: React Query v5

---

## 🧭 Folder Structure

```shell
├── public/                    # Static assets served directly
│   ├── cci_logo*.png          # Logo images used in the app
│   └── _redirects             # Redirect configuration
│
├── src/                       # Source code of the application
│   ├── components/            # Reusable UI components
│   ├── lib/                   # Utilities and shared logic
│   │   ├── auth-store.ts      # Zustand store managing authentication state
│   │   ├── queryClient.ts     # React Query client configuration
│   │   ├── types.ts           # Global TypeScript types and interfaces
│   │   └── utils.ts           # General-purpose helper functions
│   ├── pages/                 # Page-level components mapped to routes
│   ├── routes/                # Route definitions for React Router
│   ├── services/              # API integration and service logic
│   ├── App.tsx                # Root component that defines layout and router
│   ├── main.tsx               # Entry point rendering the App component
│   └── index.css              # Global styles and Tailwind CSS setup
│
├── .env                       # Environment variable definitions (API URLs, keys)
├── index.html                 # HTML entry point
├── components.json            # ShadCN UI config for component generation and theming
├── vite.config.ts             # Vite configuration file
├── eslint.config.ts           # ESLint configuration for code linting
├── tsconfig.json              # Base TypeScript configuration
├── tsconfig.node.json         # TypeScript config for Node-related tools (e.g., Vite)
├── package.json               # Project metadata and dependency list
└── README.md                  # Project documentation and setup instructions
```

---

## ⚙️ Setup Instructions

1. Clone the repository:

   ```sh
   git clone https://github.com/MincaAiAssistant/CCI-platform.git
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open your browser and go to:
   ```
   http://localhost:5173/
   ```
