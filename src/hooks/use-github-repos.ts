import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { Repository, GitHubResponse } from '@/lib/types';

const fetchTrendingRepos = async (): Promise<Repository[]> => {
  // Calculate date 7 days ago
  const date = new Date();
  date.setDate(date.getDate() - 7);
  const formattedDate = date.toISOString().split('T')[0];
  
  const response = await fetch(
    `https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc&per_page=50`
  );
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  const data: GitHubResponse = await response.json();
  return data.items;
};

export const useGitHubRepos = () => {
  const {
    data: repos = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['trending-repos'],
    queryFn: fetchTrendingRepos,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  // Extract unique languages using useMemo for performance
  const languages = useMemo(() => {
    return Array.from(
      new Set(
        repos
          .map(repo => repo.language)
          .filter((lang): lang is string => lang !== null)
      )
    ).sort();
  }, [repos]);

  return {
    repos,
    loading,
    error: error?.message || null,
    languages,
    refetch,
  };
};