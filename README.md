# Employee Dashboard

A modern HR employee management dashboard built with Next.js, React 19, and TailwindCSS. This application provides comprehensive employee data visualization, analytics, and management tools.

## Features

- **Employee Management**: View, create, and manage employee profiles
- **Authentication**: Secure access with NextAuth.js
- **Interactive Analytics**: Visualize department statistics and performance metrics
- **Bookmarking System**: Save and track favorite employee profiles
- **Responsive Design**: Built with modern UI components using Radix UI and TailwindCSS
- **Data Visualization**: Interactive charts powered by Chart.js
- **Search & Filtering**: Advanced search capabilities with filters
- **State Management**: Efficient state handling with Zustand

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js 4](https://next-auth.js.org/)
- **State Management**: [Zustand 5](https://github.com/pmndrs/zustand)
- **Data Visualization**: [Chart.js 4](https://www.chartjs.org/) with [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Toast Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/subh05sus/HR-dashboard.git
   cd HR-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_auth_secret_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
app/                  # Next.js App Router
├── analytics/        # Analytics dashboard
├── api/              # API routes
│   └── auth/         # NextAuth API routes
├── auth/             # Authentication pages
├── bookmarks/        # Bookmarked employees
├── employee/         # Individual employee details
└── page.tsx          # Homepage

components/           # Reusable React components
├── ui/               # UI components (buttons, cards, etc.)
├── user-card.tsx     # Employee card component
└── ...

contexts/             # React contexts
hooks/                # Custom React hooks
lib/                  # Utility functions and constants
store/                # Zustand state management
types/                # TypeScript type definitions
```

## Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Future Enhancements

- Unit and integration testing
- Performance optimizations
- Additional analytics features
- Employee performance tracking
- Mobile app version

## Deployment

This application can be easily deployed to Vercel:

1. Push your code to a GitHub repository
2. Import your project to [Vercel](https://vercel.com/new)
3. Set the required environment variables
4. Deploy
