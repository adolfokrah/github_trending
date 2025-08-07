import { Tabs, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/Header";
import TrendingRepos from "../components/TrendingRepos";
import StarredRepos from "../components/StarredRepos";
import { IndexTabs } from "../components/IndexTabs";
import { IndexLoadingError } from "../components/IndexLoadingError";
import { IndexFilterBar } from "../components/IndexFilterBar";
import { useIndexPage } from "../hooks/use-index-page";

const IndexView = () => {
  const {
    filteredRepos,
    starredRepos,
    languages,
    loading,
    error,
    activeTab,
    selectedLanguage,
    handleTabChange,
    handleRefresh,
    toggleStar,
    isStarred,
    getStarredCount
  } = useIndexPage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header loading={loading} onRefresh={handleRefresh} />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
            <IndexTabs 
              activeTab={activeTab}
              filteredReposCount={filteredRepos.length}
              starredCount={getStarredCount()}
            />

            <IndexFilterBar 
              activeTab={activeTab}
              languages={languages}
            />
          </div>

          <IndexLoadingError loading={loading} error={error} />

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
export default IndexView;