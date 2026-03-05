# ⚔️ CodeArena

**A real-time competitive coding platform** where developers battle head-to-head by solving coding challenges — live, fast, and in the browser.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)

---

## 🚀 Features

- **🖥️ In-Browser Code Editor** — Powered by [Monaco Editor](https://github.com/microsoft/monaco-editor) (the engine behind VS Code)
- **⚡ Real-Time Multiplayer** — Compete against other developers in live coding duels via Socket.IO
- **🎯 Coding Challenges** — Database-backed problems with varying difficulty levels
- **🎨 Smooth UI/UX** — Beautiful animations with Framer Motion and a responsive Tailwind CSS design
- **🗄️ Persistent Data** — Prisma ORM for structured data management
- **📦 Global State** — Lightweight state management with Zustand

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| **Framework**    | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language**     | [TypeScript](https://www.typescriptlang.org/)   |
| **Styling**      | [Tailwind CSS](https://tailwindcss.com/)        |
| **Database ORM** | [Prisma](https://www.prisma.io/)                |
| **Real-Time**    | [Socket.IO](https://socket.io/)                 |
| **Code Editor**  | [Monaco Editor](https://microsoft.github.io/monaco-editor/) |
| **State Mgmt**   | [Zustand](https://zustand-demo.pmnd.rs/)        |
| **Animations**   | [Framer Motion](https://www.framer.com/motion/) |

---

## 📁 Project Structure

```
CodeArena/
├── prisma/             # Database schema & seed data
├── src/
│   ├── app/            # Next.js App Router pages & API routes
│   ├── components/     # Reusable React components
│   ├── lib/            # Utility functions & shared logic
│   ├── store/          # Zustand state stores
│   └── types/          # TypeScript type definitions
├── .env.example        # Environment variable template
├── next.config.js      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies & scripts
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- A supported database (see Prisma docs for options)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/skyrabbit4/CodeArena.git
   cd CodeArena
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in the required values in `.env` (database URL, etc.).

4. **Push the database schema**

   ```bash
   npm run db:push
   ```

5. **Seed the database** (optional)

   ```bash
   npm run db:seed
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command            | Description                           |
| ------------------ | ------------------------------------- |
| `npm run dev`      | Start the development server          |
| `npm run build`    | Build for production                  |
| `npm run start`    | Start the production server           |
| `npm run lint`     | Run ESLint                            |
| `npm run db:push`  | Push Prisma schema to the database    |
| `npm run db:studio`| Open Prisma Studio (DB GUI)           |
| `npm run db:seed`  | Seed the database with initial data   |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source. See the repository for license details.

---

<p align="center">
  Built with ❤️ for competitive coders
</p>
