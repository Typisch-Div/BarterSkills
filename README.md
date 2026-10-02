## SkillLoop

SkillLoop is a full-stack learning platform for sharing and discovering video content. Users can create accounts, upload and watch videos, interact through comments and likes, and message one another. The app also includes AI-powered features and premium subscriptions.

## Features

- Browse, search, and watch videos
- Upload and manage video content
- Like and comment on videos
- User profiles and dashboards
- Direct messaging
- AI-assisted features
- Premium subscription and billing support

## Tech stack

- **Frontend:** React, Vite, Material UI
- **Backend:** Node.js, Express, MongoDB
- **Other services:** Socket.IO, Cloudinary, Google OAuth, Stripe/Razorpay

## Project structure

```text
BarterSkillsBackend/   Express API and supporting services
Frontend/              React web application
```

## Getting started

Install dependencies in each application folder:

```bash
cd BarterSkillsBackend
npm install
```

```bash
cd Frontend
npm install
```

Configure the environment variables required by the backend and frontend before starting the app. Keep secrets in local environment files and do not commit them.

Start the backend from `BarterSkillsBackend`:

```bash
npm run dev
```

Start the frontend from `Frontend`:

```bash
npm run dev
```

The frontend development server will print its local URL in the terminal.
