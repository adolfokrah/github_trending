import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RepoCard } from '@/components/RepoCard'
import type { Repository } from '@/lib/types'

// Mock repository data
const mockRepo: Repository = {
  id: 1,
  name: 'awesome-project',
  full_name: 'user/awesome-project',
  description: 'An awesome open source project',
  stargazers_count: 1250,
  language: 'TypeScript',
  html_url: 'https://github.com/user/awesome-project',
  created_at: '2023-01-15T10:30:00Z'
}

const mockRepoNoDescription: Repository = {
  ...mockRepo,
  id: 2,
  description: null,
  language: null
}

describe('RepoCard Component', () => {
  it('should render repository information correctly', () => {
    const mockToggleStar = vi.fn()
    
    render(
      <RepoCard 
        repo={mockRepo} 
        isStarred={false} 
        onToggleStar={mockToggleStar} 
      />
    )

    expect(screen.getByText('awesome-project')).toBeInTheDocument()
    expect(screen.getByText('user/awesome-project')).toBeInTheDocument()
    expect(screen.getByText('An awesome open source project')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('should handle repository without description', () => {
    const mockToggleStar = vi.fn()
    
    render(
      <RepoCard 
        repo={mockRepoNoDescription} 
        isStarred={false} 
        onToggleStar={mockToggleStar} 
      />
    )

    expect(screen.getByText('No description available')).toBeInTheDocument()
  })

  it('should handle repository without language', () => {
    const mockToggleStar = vi.fn()
    
    render(
      <RepoCard 
        repo={mockRepoNoDescription} 
        isStarred={false} 
        onToggleStar={mockToggleStar} 
      />
    )

    // Should not render language badge when language is null
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument()
  })

  it('should format star count correctly', () => {
    const mockToggleStar = vi.fn()
    
    render(
      <RepoCard 
        repo={mockRepo} 
        isStarred={false} 
        onToggleStar={mockToggleStar} 
      />
    )

    // 1250 should be formatted as "1.3k"
    expect(screen.getByText('1.3k')).toBeInTheDocument()
  })

  it('should call onToggleStar when star button is clicked', () => {
    const mockToggleStar = vi.fn()
    
    render(
      <RepoCard 
        repo={mockRepo} 
        isStarred={false} 
        onToggleStar={mockToggleStar} 
      />
    )

    const starButton = screen.getByRole('button')
    fireEvent.click(starButton)

    expect(mockToggleStar).toHaveBeenCalledWith(mockRepo.id)
  })

  it('should show different styling when starred', () => {
    const mockToggleStar = vi.fn()
    
    const { rerender } = render(
      <RepoCard 
        repo={mockRepo} 
        isStarred={false} 
        onToggleStar={mockToggleStar} 
      />
    )

    const starButton = screen.getByRole('button')
    expect(starButton).toHaveClass('text-muted-foreground')

    // Re-render with starred state
    rerender(
      <RepoCard 
        repo={mockRepo} 
        isStarred={true} 
        onToggleStar={mockToggleStar} 
      />
    )

    expect(starButton).toHaveClass('text-star')
  })

  it('should have a link to GitHub repository', () => {
    const mockToggleStar = vi.fn()
    
    render(
      <RepoCard 
        repo={mockRepo} 
        isStarred={false} 
        onToggleStar={mockToggleStar} 
      />
    )

    const viewLink = screen.getByRole('link', { name: /view/i })
    expect(viewLink).toHaveAttribute('href', mockRepo.html_url)
    expect(viewLink).toHaveAttribute('target', '_blank')
  })
})
