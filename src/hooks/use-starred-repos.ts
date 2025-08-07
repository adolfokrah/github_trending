import { useState, useEffect } from 'react';

const STARRED_REPOS_KEY = 'github-client-starred-repos';

export const useStarredRepos = () => {
  const [starredRepos, setStarredRepos] = useState<Set<number>>(new Set());

  // Load starred repos from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STARRED_REPOS_KEY);
      if (stored) {
        const parsedIds = JSON.parse(stored) as number[];
        setStarredRepos(new Set(parsedIds));
      }
    } catch (error) {
      console.error('Error loading starred repos from localStorage:', error);
    }
  }, []);

  // Save to localStorage whenever starredRepos changes
  const saveToStorage = (newStarredRepos: Set<number>) => {
    try {
      localStorage.setItem(
        STARRED_REPOS_KEY,
        JSON.stringify(Array.from(newStarredRepos))
      );
    } catch (error) {
      console.error('Error saving starred repos to localStorage:', error);
    }
  };

  const toggleStar = (repoId: number) => {
    setStarredRepos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(repoId)) {
        newSet.delete(repoId);
      } else {
        newSet.add(repoId);
      }
      saveToStorage(newSet);
      return newSet;
    });
  };

  const isStarred = (repoId: number) => starredRepos.has(repoId);

  const getStarredCount = () => starredRepos.size;

  return {
    starredRepos,
    toggleStar,
    isStarred,
    getStarredCount,
  };
};