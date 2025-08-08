import { GitHubResponse, Repository } from "@/lib/types";

 const fetchTrendingRepos = async (): Promise<Repository[]> => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  const formattedDate = date.toISOString().split('T')[0];
  
  const response = await fetch(
    `https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc&per_page=50`
  );
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  const data: GitHubResponse = await response.json();
  return data.items;
};


export default fetchTrendingRepos;