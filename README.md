#Bablue - An AI Agent

A modern AI-powered assistant built with Next.js, featuring real-time chat capabilities and task management.

## Live Demo

Check out the live demo at: [https://bablue-an-ai-agent.vercel.app/](https://bablue-an-ai-agent.vercel.app/)

## Features

- 🤖 AI-powered chat interface
- 🔐 Secure authentication with Clerk
- 📝 Task management system
- 🎨 Modern UI with Tailwind CSS and Framer Motion
- 🌙 Dark/Light mode support
- 📱 Responsive design
- 🔄 Real-time updates

## Tech Stack

- **Framework**: Next.js 15.1.7
- **Frontend**: React 19, Tailwind CSS, Framer Motion
- **Authentication**: Clerk
- **Database**: MongoDB (Mongoose)
- **AI Integration**: OpenAI API
- **Styling**: Tailwind CSS, Styled Components
- **UI Components**: Radix UI, Lucide Icons
- **3D Graphics**: Spline

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- OpenAI API key
- Clerk account

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd ai-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```
MONGODB_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - Reusable UI components
- `/model` - Database models and schemas
- `/controllers` - Business logic and API controllers
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and helpers
- `/constants` - Application constants
- `/public` - Static assets

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

