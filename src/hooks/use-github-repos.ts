import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { Repository, GitHubResponse } from '@/lib/types';
import fetchTrendingRepos from '@/api/fetch-trending-repo';


export const useGitHubRepos = () => {
  const {
    data: repos = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['trending-repos'],
    queryFn: fetchTrendingRepos,
  });

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