# 🌞 TanSaaS Start

A production-ready starter to build SaaS apps **fast** using the **TanStack ecosystem**, **Supabase**, **Stripe**, and full **Docker** support.

## 🌐 Demo

Demo available soon !

## 📌 Overview

**TanSaaS Start** is a modern SaaS starter built with **TanStack Start**, designed to help you launch SaaS applications in minutes.

It provides authentication, billing, routing, database, UI scaffolding, and dockerized deployment using a minimal, clean, and scalable architecture.

### 🧱 Tech Stack

- ⚛️ **TanStack Start** (full-stack React framework)
- 💙 **TypeScript**
- ⚡ **Vite**
- 🎨 **TailwindCSS**
- 🟩 **Supabase** (Auth + Database + Storage)
- 💰 **Stripe** (Subscriptions + Webhooks)
- 🧭 **TanStack Router**
- 🐳 **Docker** (development & production)
- 🔧 **ESLint + Prettier**

### Not Included Yet (but prepared for)

- 📩 SMTP / email delivery
- 🌍 Multi-language (i18n)

## 🚀 Getting Started

---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Biechy/tansaas-start
cd tansaas-start
```

### 2️⃣ Configure Stripe

In `.env.example`, fill in:

```bash
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_BILLING_URL= # the URL to manage the subscriptions (https://billing.stripe.com/p/login/...)
```

If you do not have stripe plans for the moment, change the environment variable `WAITLIST` to `true` to create a table in Supabase and enable waiting list registration on the landing page.

The endpoint for the Stripe webhook is here: `src/routes/api/stripe.ts`.

### 3️⃣ Configure Supabase

In `.env.example`, fill in:

```bash
POSTGRES_PASSWORD=
JWT_SECRET=
ANON_KEY=
SERVICE_ROLE_KEY=
DASHBOARD_USERNAME=
DASHBOARD_PASSWORD=
SECRET_KEY_BASE=
VAULT_ENC_KEY=
```

If you don't know how to do it, look at the [Supabase self-hosting docs](https://supabase.com/docs/guides/self-hosting/docker).

### 4️⃣ Run container

Copy `.env.example → .env`, then run:

```bash
docker compose up -d
```

App running on:
👉 http://localhost:3000

Supabase dashboard running on:
👉 http://localhost:8000

### 5️⃣ Add your Stripe plans

Go to the Supabase dashboard (http://localhost:8000) and edit the table `subscription_plans` with the information plans from Stripe.

### 🔄 Reset ? Problems ?

You can remove your containers/volumes and copy `.env.example → .env` by running:

```bash
bash reset.sh
```

## ✨ Key Features

### 🔐 Authentication

- Supabase Auth
- Fully typed sessions
- Server & client integration
- Protected routes

### 💳 Stripe Billing

- Subscription management
- Configured Stripe SDK
- Webhook endpoint included

### 🎨 UI & Styling

- TailwindCSS
- Clean, minimal, production-ready base components
- Responsive layouts and theme switching

### 🐳 Docker Included

- Local development ready
- Production build setup
- Docker Compose for full environment

### 🧑‍💻 Developer Experience

- File-based routing
- TypeScript strict mode
- Preconfigured ESLint + Prettier
- Clean and scalable project structure

---

## 🤝 Contributing

Contributions are welcome!
Please keep the code clean, typed, and consistent.

## 📄 License

This project is open source and available under the [MIT License](/LICENSE).
