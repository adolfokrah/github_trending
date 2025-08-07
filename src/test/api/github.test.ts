import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import React from 'react'
import { useGitHubRepos } from '@/hooks/use-github-repos'
import type { GitHubResponse } from '@/lib/types'

// Mock GitHub API response
const mockGitHubResponse: GitHubResponse = {
  total_count: 2,
  items: [
    {
      id: 1,
      name: 'awesome-project',
      full_name: 'user/awesome-project',
      description: 'An awesome project',
      stargazers_count: 1250,
      language: 'TypeScript',
      html_url: 'https://github.com/user/awesome-project',
      created_at: '2023-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'cool-app',
      full_name: 'dev/cool-app',
      description: 'A cool application',
      stargazers_count: 850,
      language: 'JavaScript',
      html_url: 'https://github.com/dev/cool-app',
      created_at: '2023-01-20T15:45:00Z'
    }
  ]
}

// Setup MSW server
const server = setupServer(
  http.get('https://api.github.com/search/repositories', () => {
    return HttpResponse.json(mockGitHubResponse)
  })
)

// Helper to render hook with React Query provider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })
  
  return ({ children }: { children: React.ReactNode }) => 
    React.createElement(QueryClientProvider, { client: queryClient }, children)
}

describe('useGitHubRepos Hook - API Integration', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should fetch and return GitHub repositories', async () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useGitHubRepos(), { wrapper })

    // Initially loading
    expect(result.current.loading).toBe(true)
    expect(result.current.repos).toEqual([])
    expect(result.current.error).toBe(null)

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.repos).toHaveLength(2)
    expect(result.current.repos[0].name).toBe('awesome-project')
    expect(result.current.repos[1].name).toBe('cool-app')
    expect(result.current.error).toBe(null)
  })

  it('should extract unique languages from repositories', async () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useGitHubRepos(), { wrapper })
    
    await waitFor(() => {
      expect(result.current.repos).toHaveLength(2)
    })
    
    expect(result.current.languages).toEqual(['JavaScript', 'TypeScript'])
  })

  it('should handle API errors gracefully', async () => {
    // Override the handler to return an error
    server.use(
      http.get('https://api.github.com/search/repositories', () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    const wrapper = createWrapper()
    const { result } = renderHook(() => useGitHubRepos(), { wrapper })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.repos).toEqual([])
    expect(result.current.error).toBeTruthy()
  })

  it('should handle network errors', async () => {
    // Override the handler to simulate network error
    server.use(
      http.get('https://api.github.com/search/repositories', () => {
        return HttpResponse.error()
      })
    )

    const wrapper = createWrapper()
    const { result } = renderHook(() => useGitHubRepos(), { wrapper })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.repos).toEqual([])
    expect(result.current.error).toBeTruthy()
  })

  it('should refetch data when refetch is called', async () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useGitHubRepos(), { wrapper })

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.repos).toHaveLength(2)

    // Call refetch and wait for it
    await act(async () => {
      await result.current.refetch()
    })

    // Data should still be available after refetch
    expect(result.current.repos).toHaveLength(2)
  })
})
