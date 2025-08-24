// types/github.ts
export interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  pushed_at: string;
  language: string;
}

export interface RepoFilters {
  stargazers_count?: number;
  forks_count?: number;
  open_issues_count?: number;
  language?: string;
  sortBy?: "stars" | "forks" | "issues" | "updated";
  order?: "asc" | "desc";
}