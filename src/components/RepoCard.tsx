import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RepoCardProps } from "@/lib/types";
import { formatDate, formatStarCount } from "@/lib/utils";

export const RepoCard = ({ repo, isStarred, onToggleStar }: RepoCardProps) => {


  return (
    <Card className="p-6 bg-gradient-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card group" role="article">
      <div className="flex flex-col space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {repo.name}
            </h3>
            <p className="text-sm text-muted-foreground font-mono">
              {repo.full_name}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleStar(repo.id)}
            className={`ml-4 transition-all duration-300 ${
              isStarred 
                ? "text-star hover:text-star/80 bg-star/10 hover:bg-star/20" 
                : "text-muted-foreground hover:text-star hover:bg-star/10"
            }`}
          >
            <Star 
              className={`w-4 h-4 mr-1 transition-transform duration-300 ${
                isStarred ? "fill-current scale-110" : "group-hover:scale-110"
              }`} 
            />
            {formatStarCount(repo.stargazers_count)}
          </Button>
        </div>

        {repo.description ? (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {repo.description}
          </p>
        ) : (
          <p className="text-muted-foreground text-sm leading-relaxed italic">
            No description available
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {repo.language && (
              <Badge variant="secondary" className="text-xs">
                {repo.language}
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">
              Created {formatDate(repo.created_at)}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};