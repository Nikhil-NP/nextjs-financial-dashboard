# Next.js Financial Dashboard

This was part of my approch to understand nextjs better:
This project is based on the [Next.js Learn Dashboard App](https://nextjs.org/learn/dashboard-app)  by Vercel.  
It demonstrates a full-stack dashboard with authentication, CRUD operations, and a Postgres database (Neon) using the Next.js App Router.

---

##  Live Demo

[View the live project here](https://nextjs-financial-dashboard-dusky.vercel.app/dashboard)

---

##  Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Postgres (Neon)](https://neon.tech/)
- [pnpm](https://pnpm.io/) (for fast package management)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/) (authentication)

---

##  Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/Nikhil-NP/nextjs-financial-dashboard
cd nextjs-dashboard
```

### 2. **Install Dependencies**

```bash
npm install -g pnpm
pnpm install
```

### 3. **Set Up Environment Variables**

- Copy `.env.example` to `.env` (if available) or create a `.env` file.
- Add your Neon Postgres connection string as `POSTGRES_URL`.
- (Optional) Add any other required environment variables.

### 4. **Run the Development Server**

```bash
pnpm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app locally.

---

##  Database Setup

- The app uses a Neon Postgres database.
- To seed the database with demo data, visit `/seed` (e.g., [http://localhost:3000/seed](http://localhost:3000/seed) or your deployed `/seed` route).
- You can reset the demo data at any time by visiting this endpoint.

---

##  Demo Credentials

- Demo user credentials are shown on the login page.
- Example:
  - **Email:** `user@nextmail.com`
  - **Password:** `123456`

---

##  Features

- User authentication (NextAuth.js)
- CRUD operations for invoices and customers
- Responsive dashboard UI
- Data seeding/reset via `/seed` endpoint
- Deployed on Vercel

---

##  Project Scripts

```bash
pnpm dev         # Start the development server
pnpm build       # Build for production
pnpm start       # Start the production server
```

---

##  Deployment

- This project is deployed on [Vercel](https://vercel.com/).
- [Live link to the dashboard](https://nextjs-financial-dashboard-dusky.vercel.app/dashboard)

---

##  Resources

- [Next.js Learn Course](https://nextjs.org/learn/dashboard-app)
- [Neon Postgres](https://neon.tech/)
- [pnpm Motivation](https://pnpm.io/motivation)

---

##  Credits

- Based on the official [Next.js Learn Dashboard App](https://nextjs.org/learn/dashboard-app) by Vercel.

---