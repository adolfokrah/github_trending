import { useMemo } from 'react';
import type { Repository } from '@/lib/types';

interface UseRepositoryFiltersProps {
  repos: Repository[];
  selectedLanguage: string;
  isStarred: (id: number) => boolean;
}

export const useRepositoryFilters = ({ 
  repos, 
  selectedLanguage, 
  isStarred 
}: UseRepositoryFiltersProps) => {
  // Filter repos by language
  const filteredRepos = useMemo(() => {
    if (selectedLanguage === "all") return repos;
    return repos.filter(repo => repo.language === selectedLanguage);
  }, [repos, selectedLanguage]);

  // Get starred repos from the main list
  const starredRepos = useMemo(() => {
    return repos.filter(repo => isStarred(repo.id));
  }, [repos, isStarred]);

  return {
    filteredRepos,
    starredRepos
  };
};
