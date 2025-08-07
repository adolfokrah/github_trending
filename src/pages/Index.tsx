import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Star, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { LanguageFilter } from "@/components/language-filter";
import Header from "@/components/header";
import TrendingRepos from "@/components/trending-repos";
import StarredRepos from "@/components/starred-repos";
import { useGitHubRepos } from "@/hooks/use-github-repos";
import { useStarredRepos } from "@/hooks/use-starred-repos";

const Index = () => {
  const { repos, loading, error, languages, refetch } = useGitHubRepos();
  const { toggleStar, isStarred, getStarredCount } = useStarredRepos();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get initial values from URL params
  const tabFromUrl = searchParams.get('tab') || 'trending';
  const selectedLanguage = searchParams.get('language') || 'all';
  
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  // Update state when URL params change
  useEffect(() => {
    const newTab = searchParams.get('tab') || 'trending';
    setActiveTab(newTab);
  }, [searchParams]);

  // Filter repos by language
  const filteredRepos = useMemo(() => {
    if (selectedLanguage === "all") return repos;
    return repos.filter(repo => repo.language === selectedLanguage);
  }, [repos, selectedLanguage]);

  // Get starred repos from the main list
  const starredRepos = useMemo(() => {
    return repos.filter(repo => isStarred(repo.id));
  }, [repos, isStarred]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (tab === 'trending') {
      newParams.delete('tab');
    } else {
      newParams.set('tab', tab);
    }
    setSearchParams(newParams);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header loading={loading} onRefresh={handleRefresh} />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="trending" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Filter className="w-4 h-4 mr-2" />
                Trending ({filteredRepos.length})
              </TabsTrigger>
              <TabsTrigger value="starred" className="data-[state=active]:bg-star data-[state=active]:text-star-foreground">
                <Star className="w-4 h-4 mr-2" />
                Starred ({getStarredCount()})
              </TabsTrigger>
            </TabsList>

            {activeTab === "trending" && languages.length > 0 && (
              <LanguageFilter
                languages={languages}
              />
            )}
          </div>

          {/* Error state */}
          {error && (
            <Alert className="mb-6 border-destructive/50 bg-destructive/10">
              <AlertDescription className="text-destructive">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <LoadingSpinner size="lg" />
              <p className="text-muted-foreground">Fetching trending repositories...</p>
            </div>
          )}

          {/* Trending repositories */}
          <TabsContent value="trending" className="mt-0">
            <TrendingRepos
              repos={filteredRepos}
              loading={loading}
              error={error}
              selectedLanguage={selectedLanguage}
              isStarred={isStarred}
              onToggleStar={toggleStar}
            />
          </TabsContent>

          {/* Starred repositories */}
          <TabsContent value="starred" className="mt-0">
            <StarredRepos
              repos={starredRepos}
              onToggleStar={toggleStar}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;