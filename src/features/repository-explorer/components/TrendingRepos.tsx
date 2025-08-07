import { RepoCard } from "@/components/repo-card";
import type { TrendingReposProps } from "@/lib/types";

const TrendingRepos = ({ 
  repos, 
  loading, 
  error, 
  selectedLanguage, 
  isStarred, 
  onToggleStar 
}: TrendingReposProps) => {
  if (loading || error) {
    return null;
  }

  return (
    <>
      {repos.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {repos.map((repo) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              isStarred={isStarred(repo.id)}
              onToggleStar={onToggleStar}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No repositories found for {selectedLanguage === "all" ? "any language" : selectedLanguage}
          </p>
        </div>
      )}
    </>
  );
};

export default TrendingRepos;
