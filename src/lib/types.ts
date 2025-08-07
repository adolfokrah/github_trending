export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  created_at: string;
}

export interface GitHubResponse {
  items: Repository[];
  total_count: number;
}

export interface RepoCardProps {
  repo: Repository;
  isStarred: boolean;
  onToggleStar: (repoId: number) => void;
}

export interface LanguageFilterProps {
  languages: string[];
}

export interface HeaderProps {
  loading: boolean;
  onRefresh: () => void;
}

export interface TrendingReposProps {
  repos: Repository[];
  loading: boolean;
  error: string | null;
  selectedLanguage: string;
  isStarred: (id: number) => boolean;
  onToggleStar: (repoId: number) => void;
}

export interface StarredReposProps {
  repos: Repository[];
  onToggleStar: (repoId: number) => void;
}
