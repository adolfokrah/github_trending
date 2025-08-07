import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useStarredRepos } from '@/hooks/use-starred-repos'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useStarredRepos Hook', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    localStorageMock.clear()
  })

  it('should initialize with empty starred repos', () => {
    const { result } = renderHook(() => useStarredRepos())
    
    expect(result.current.getStarredCount()).toBe(0)
    expect(result.current.isStarred(1)).toBe(false)
  })

  it('should load starred repos from localStorage', () => {
    // Pre-populate localStorage
    localStorageMock.setItem('github-client-starred-repos', JSON.stringify([1, 2, 3]))
    
    const { result } = renderHook(() => useStarredRepos())
    
    expect(result.current.getStarredCount()).toBe(3)
    expect(result.current.isStarred(1)).toBe(true)
    expect(result.current.isStarred(2)).toBe(true)
    expect(result.current.isStarred(4)).toBe(false)
  })

  it('should toggle star status correctly', () => {
    const { result } = renderHook(() => useStarredRepos())
    
    // Star a repo
    act(() => {
      result.current.toggleStar(1)
    })
    
    expect(result.current.isStarred(1)).toBe(true)
    expect(result.current.getStarredCount()).toBe(1)
    
    // Unstar the repo
    act(() => {
      result.current.toggleStar(1)
    })
    
    expect(result.current.isStarred(1)).toBe(false)
    expect(result.current.getStarredCount()).toBe(0)
  })

  it('should persist starred repos to localStorage', () => {
    const { result } = renderHook(() => useStarredRepos())
    
    act(() => {
      result.current.toggleStar(1)
      result.current.toggleStar(2)
    })
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'github-client-starred-repos', 
      JSON.stringify([1, 2])
    )
  })

  it('should handle localStorage errors gracefully', () => {
    // Mock console.error to suppress expected error messages
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    // Mock localStorage to throw an error
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('Storage quota exceeded')
    })
    
    const { result } = renderHook(() => useStarredRepos())
    
    // Should not throw an error
    expect(() => {
      act(() => {
        result.current.toggleStar(1)
      })
    }).not.toThrow()
    
    // Verify error was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error saving starred repos to localStorage:',
      expect.any(Error)
    )
    
    // Restore console.error
    consoleErrorSpy.mockRestore()
  })

  it('should handle invalid localStorage data', () => {
    // Mock console.error to suppress expected error messages
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    // Set invalid JSON in localStorage
    localStorageMock.getItem.mockReturnValue('invalid json')
    
    const { result } = renderHook(() => useStarredRepos())
    
    // Should fallback to empty array
    expect(result.current.getStarredCount()).toBe(0)
    
    // Verify error was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error loading starred repos from localStorage:',
      expect.any(Error)
    )
    
    // Restore console.error
    consoleErrorSpy.mockRestore()
  })
})
