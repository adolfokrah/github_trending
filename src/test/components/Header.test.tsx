import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '@/components/header'

describe('Header Component', () => {
  it('should render the GitHub Trending title', () => {
    const mockRefresh = vi.fn()
    
    render(<Header loading={false} onRefresh={mockRefresh} />)
    
    expect(screen.getByText('GitHub Trending')).toBeInTheDocument()
    expect(screen.getByText('Discover popular repositories from the last 7 days')).toBeInTheDocument()
  })

  it('should render refresh button', () => {
    const mockRefresh = vi.fn()
    
    render(<Header loading={false} onRefresh={mockRefresh} />)
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i })
    expect(refreshButton).toBeInTheDocument()
    expect(refreshButton).not.toBeDisabled()
  })

  it('should call onRefresh when refresh button is clicked', () => {
    const mockRefresh = vi.fn()
    
    render(<Header loading={false} onRefresh={mockRefresh} />)
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i })
    fireEvent.click(refreshButton)
    
    expect(mockRefresh).toHaveBeenCalledTimes(1)
  })

  it('should disable refresh button when loading', () => {
    const mockRefresh = vi.fn()
    
    render(<Header loading={true} onRefresh={mockRefresh} />)
    
    const refreshButton = screen.getByRole('button', { name: /refresh/i })
    expect(refreshButton).toBeDisabled()
  })

  it('should show spinning icon when loading', () => {
    const mockRefresh = vi.fn()
    
    render(<Header loading={true} onRefresh={mockRefresh} />)
    
    // The RefreshCw icon should have the animate-spin class when loading
    const refreshIcon = document.querySelector('.animate-spin')
    expect(refreshIcon).toBeInTheDocument()
  })
})
