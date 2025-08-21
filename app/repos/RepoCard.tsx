// app/repos/components/RepoCard.tsx
import { Repo } from "../types/github";

export default function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold">
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.full_name}
        </a>
      </h2>
      <p className="text-sm text-gray-600">{repo.description}</p>
      <div className="flex gap-4 mt-2 text-sm">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span>🐛 {repo.open_issues_count}</span>
      </div>
    </div>
  );
}
