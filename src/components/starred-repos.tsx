import { Star } from "lucide-react";
import { RepoCard } from "@/components/repo-card";
import type { StarredReposProps } from "@/lib/types";

const StarredRepos = ({ repos, onToggleStar }: StarredReposProps) => {
  return (
    <>
      {repos.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {repos.map((repo) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              isStarred={true}
              onToggleStar={onToggleStar}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No starred repositories</h3>
            <p className="text-muted-foreground">
              Star repositories from the trending tab to see them here
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default StarredRepos;
