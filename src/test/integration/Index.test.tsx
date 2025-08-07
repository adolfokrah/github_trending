import { describe, it, expect, vi, beforeEach, beforeAll, afterEach, afterAll } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import Index from '@/pages/Index'
import type { GitHubResponse } from '@/lib/types'

// Mock data for different scenarios
const mockGitHubResponse: GitHubResponse = {
  total_count: 2,
  items: [
    {
      id: 1,
      name: 'test-repo',
      full_name: 'user/test-repo',
      description: 'Test repository',
      stargazers_count: 100,
      language: 'JavaScript',
      html_url: 'https://github.com/user/test-repo',
      created_at: '2023-01-01T00:00:00Z'
    },
    {
      id: 2,
      name: 'python-repo',
      full_name: 'user/python-repo',
      description: 'Python repository',
      stargazers_count: 50,
      language: 'Python',
      html_url: 'https://github.com/user/python-repo',
      created_at: '2023-01-02T00:00:00Z'
    }
  ]
}

// Setup MSW server
const server = setupServer(
  http.get('https://api.github.com/search/repositories', () => {
    return HttpResponse.json(mockGitHubResponse)
  })
)

// Mock only the starred repos hook (localStorage-based, not API-based)
vi.mock('@/hooks/use-starred-repos', () => ({
  useStarredRepos: () => ({
    toggleStar: vi.fn(),
    isStarred: vi.fn().mockReturnValue(false),
    getStarredCount: vi.fn().mockReturnValue(0)
  })
}))

// Helper to render component with providers
const renderWithProviders = (initialEntries = ['/']) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0, // Disable caching for tests
      },
    },
  })
  
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter 
        initialEntries={initialEntries}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <Index />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('Index Page Integration Tests', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
    vi.clearAllMocks()
  })
  afterAll(() => server.close())

  it('should render trending tab by default', async () => {
    renderWithProviders()
    
    // Wait for the API data to load
    await waitFor(() => {
      expect(screen.getByText('Trending (2)')).toBeInTheDocument()
    })
    
    expect(screen.getByText('test-repo')).toBeInTheDocument()
    expect(screen.getByText('python-repo')).toBeInTheDocument()
  })

  it('should show starred tab when URL has tab=starred', async () => {
    renderWithProviders(['/?tab=starred'])
    
    // Wait for initial load to complete
    await waitFor(() => {
      expect(screen.getByText('Starred (0)')).toBeInTheDocument()
    })
    
    // Should show empty state for starred repos
    expect(screen.getByText('No starred repositories')).toBeInTheDocument()
  })

  it('should filter by language from URL', async () => {
    renderWithProviders(['/?language=JavaScript'])
    
    // Wait for the API data to load and filter to be applied
    await waitFor(() => {
      expect(screen.getByText('Filter by language:')).toBeInTheDocument()
    })
    
    // The repos should be filtered - check for specific count based on mock data
    // JavaScript repos from mock: 1 repo
    await waitFor(() => {
      expect(screen.getByText('Trending (1)')).toBeInTheDocument()
    })
  })

  it('should switch tabs and update URL', async () => {
    const user = userEvent.setup()
    renderWithProviders()
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Trending (2)')).toBeInTheDocument()
    })
    
    const starredTab = screen.getByRole('tab', { name: /starred/i })
    await user.click(starredTab)
    
    // Wait for tab to become active
    await waitFor(() => {
      expect(starredTab).toHaveAttribute('aria-selected', 'true')
    })
    
    // Now check for the starred repos content (empty state)
    await waitFor(() => {
      // The StarredRepos component should be rendered
      expect(screen.getByRole('tabpanel')).toBeInTheDocument()
    })
  })
})

describe('Index Page Loading and Error States', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
    vi.clearAllMocks()
  })
  afterAll(() => server.close())

  it('should handle loading state correctly', async () => {
    // Override the default handler to add delay
    server.use(
      http.get('https://api.github.com/search/repositories', async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
        return HttpResponse.json(mockGitHubResponse)
      })
    )
    
    renderWithProviders()
    
    // Should show loading state initially
    expect(screen.getByText('Fetching trending repositories...')).toBeInTheDocument()
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Trending (2)')).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('should show error state', async () => {
    // Override the default handler to return error
    server.use(
      http.get('https://api.github.com/search/repositories', () => {
        return HttpResponse.error()
      })
    )
    
    renderWithProviders()
    
    // Wait for error state to appear
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument()
    }, { timeout: 2000 })
  })
})
