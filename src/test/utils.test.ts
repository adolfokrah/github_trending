import { describe, it, expect } from 'vitest'

// Test utility functions that could be extracted from components
describe('Utility Functions', () => {
  // Extract and test the formatStarCount function from RepoCard
  const formatStarCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  describe('formatStarCount', () => {
    it('should format numbers under 1000 as-is', () => {
      expect(formatStarCount(0)).toBe('0')
      expect(formatStarCount(1)).toBe('1')
      expect(formatStarCount(999)).toBe('999')
    })

    it('should format thousands with k suffix', () => {
      expect(formatStarCount(1000)).toBe('1.0k')
      expect(formatStarCount(1500)).toBe('1.5k')
      expect(formatStarCount(999999)).toBe('1000.0k')
    })

    it('should format millions with M suffix', () => {
      expect(formatStarCount(1000000)).toBe('1.0M')
      expect(formatStarCount(1500000)).toBe('1.5M')
      expect(formatStarCount(2750000)).toBe('2.8M')
    })
  })

  describe('formatDate', () => {
    it('should format ISO date strings correctly', () => {
      const testDate = '2023-12-25T10:30:00Z'
      const formatted = formatDate(testDate)
      expect(formatted).toBe('Dec 25, 2023')
    })

    it('should handle different date formats', () => {
      const testDate = '2024-01-01T00:00:00Z'
      const formatted = formatDate(testDate)
      expect(formatted).toBe('Jan 1, 2024')
    })
  })
})
