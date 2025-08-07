import { useGitHubRepos } from '@/hooks/use-github-repos';
import { useStarredRepos } from '@/hooks/use-starred-repos';
import { useTabNavigation } from './use-tab-navigation';
import { useRepositoryFilters } from './use-repository-filters';

export const useIndexPage = () => {
  // Core data fetching
  const { repos, loading, error, languages, refetch } = useGitHubRepos();
  const { toggleStar, isStarred, getStarredCount } = useStarredRepos();
  
  // Navigation and URL state
  const { activeTab, handleTabChange, searchParams } = useTabNavigation();
  
  // Get selected language from URL
  const selectedLanguage = searchParams.get('language') || 'all';
  
  // Repository filtering
  const { filteredRepos, starredRepos } = useRepositoryFilters({
    repos,
    selectedLanguage,
    isStarred
  });

  // Handlers
  const handleRefresh = () => {
    refetch();
  };

  return {
    // Data
    repos,
    filteredRepos,
    starredRepos,
    languages,
    
    // State
    loading,
    error,
    activeTab,
    selectedLanguage,
    
    // Actions
    handleTabChange,
    handleRefresh,
    toggleStar,
    isStarred,
    getStarredCount
  };
};
