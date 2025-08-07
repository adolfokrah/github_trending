# GitHub Trending Explorer

A modern, responsive web application for discovering and managing trending GitHub repositories. Built with React, TypeScript, and Tailwind CSS, featuring comprehensive testing and future-ready architecture.

## 🚀 Features

- **Trending Repositories**: Browse the most popular GitHub repositories from the last 7 days
- **Language Filtering**: Filter repositories by programming language
- **Starred Repositories**: Save and manage your favorite repositories locally
- **URL-based Navigation**: Direct links to specific tabs and language filters
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Data**: Fresh data from GitHub's trending API
- **Modern UI**: Clean, accessible interface with smooth animations
- **Comprehensive Testing**: 100% test coverage with integration and unit tests
- **Future-Ready**: React Router v7 compatibility with future flags enabled

## 🛠 Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS with shadcn/ui components
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: React Router DOM with v7 future flags
- **Testing**: Vitest 3.2.4 with React Testing Library and MSW
- **Package Manager**: pnpm (recommended) or npm
- **UI Components**: Radix UI primitives via shadcn/ui

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── language-filter.tsx  # Language selection dropdown
│   └── repo-card.tsx    # Repository card component
├── hooks/               # Custom React hooks
│   ├── use-github-repos.ts  # GitHub API data fetching
│   └── use-starred-repos.ts # Local starred repos management
├── lib/                 # Utilities and types
│   └── utils.ts        # Utility functions
├── pages/              # Page components
│   ├── Index.tsx       # Main application page
│   └── NotFound.tsx    # 404 error page
└── test/               # Comprehensive test suite
    ├── api/            # API layer tests
    ├── components/     # Component unit tests
    ├── hooks/          # Custom hooks tests
    └── integration/    # Full integration tests
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed ([Download](https://nodejs.org/))
- pnpm installed (recommended) or npm

```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm
```

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd git-feed
```

2. **Install dependencies**
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

3. **Start the development server**
```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:8081` (or the port shown in your terminal)

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run linting
pnpm lint
```

## 🧪 Testing

This project features a comprehensive testing strategy with **100% test coverage**:

### Test Types
- **Unit Tests**: Individual component and hook testing
- **Integration Tests**: Full page testing with realistic API mocking
- **API Tests**: GitHub API integration testing with MSW

### Testing Stack
- **Vitest 3.2.4**: Fast, Vite-native test runner
- **React Testing Library**: Component testing utilities
- **MSW (Mock Service Worker)**: Realistic API mocking
- **@testing-library/user-event**: User interaction simulation

### Running Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode during development
pnpm test:watch

# Generate coverage report
pnpm test:coverage

# Run specific test file
pnpm test src/test/components/RepoCard.test.tsx
```

## 🌐 Usage

1. **Browse Trending**: View the most popular GitHub repositories from the past week
2. **Filter by Language**: Use the language dropdown to filter repositories by programming language
3. **Star Repositories**: Click the star icon to save repositories to your favorites
4. **Navigate via URL**: Share direct links to specific views (e.g., `/?tab=starred&language=typescript`)
5. **Refresh Data**: Click the refresh button to fetch the latest trending repositories

## 🔗 URL Parameters

- `tab`: Switch between views (`trending` or `starred`)
- `language`: Filter by programming language (e.g., `javascript`, `python`, `typescript`)

Example URLs:
- `/?tab=starred` - View starred repositories
- `/?language=typescript` - Filter trending repos by TypeScript
- `/?tab=trending&language=python` - View trending Python repositories

## 🏗 Architecture Highlights

- **Component-based**: Modular, reusable components with clear separation of concerns
- **Type-safe**: Full TypeScript coverage with comprehensive type definitions
- **URL-driven**: State synchronization with URL for shareable links
- **Performance**: Optimized with React Query caching and efficient data fetching
- **Responsive**: Mobile-first design with Tailwind CSS utilities
- **Future-Ready**: React Router v7 compatibility with future flags enabled
- **Well-Tested**: Comprehensive test suite with 100% coverage and realistic mocking
- **Error Handling**: Robust error boundaries and graceful fallbacks
- **Accessibility**: WCAG-compliant components and keyboard navigation

## 🔧 Development

### Code Quality
- **ESLint**: Comprehensive linting rules for code consistency
- **TypeScript**: Strict type checking for reliability
- **Prettier**: Automatic code formatting (via ESLint integration)
- **Testing**: Mandatory test coverage for all features

### Best Practices
- **Component Architecture**: Single responsibility principle with clear prop interfaces
- **State Management**: Local state with React Query for server state
- **Error Boundaries**: Graceful error handling at component boundaries
- **Performance**: Optimized re-renders with proper memoization
- **Accessibility**: Semantic HTML and ARIA labels throughout
