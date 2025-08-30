"use client";

import { useEffect, useState } from "react";
import { Repo } from "../types/github";
import RepoCard from "./RepoCard";
import FilterBar from "./Filters";

export default function ReposPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    stack: "", // Tech bucket default
    stars: "", // Stars ↓ (high → low)
    issues: "", // Issues ↓ (high → low)
    activity: "", // Activity ↓ (recent first)
    forks: "", // Forks ↓ (high → low)
  });

  // useEffect(() => {
  //   async function loadRepos() {
  //     setLoading(true);
  //     const res = await fetch(
  //       `/api/repos?stack=${filters.stack}&sort=stars&order=desc` // always fetch plenty
  //     );
  //     const data = await res.json();

  //     let sortedData = [...data];

  //     if (filters.sort === "stars") {
  //       sortedData.sort((a, b) => a.stargazers_count - b.stargazers_count);
  //     } else if (filters.sort === "issues") {
  //       sortedData.sort((a, b) => a.open_issues_count - b.open_issues_count);
  //     } else if (filters.sort === "forks") {
  //       sortedData.sort((a, b) => a.forks_count - b.forks_count);
  //     }

  //     setRepos(sortedData);
  //     setLoading(false);
  //   }
  //   loadRepos();
  // }, [filters]);

  useEffect(() => {
    async function loadRepos() {
      setLoading(true);

      const res = await fetch(
        `/api/repos?stack=${filters.stack}&sort=stars&order=desc`
      );
      const data = await res.json();
      let sortedData = [...data];

      sortedData.sort((a, b) => {
        // Stars
        if (filters.stars === "asc") {
          if (a.stargazers_count !== b.stargazers_count)
            return a.stargazers_count - b.stargazers_count;
        } else {
          if (a.stargazers_count !== b.stargazers_count)
            return b.stargazers_count - a.stargazers_count;
        }

        // Issues
        if (filters.issues === "asc") {
          if (a.open_issues_count !== b.open_issues_count)
            return a.open_issues_count - b.open_issues_count;
        } else {
          if (a.open_issues_count !== b.open_issues_count)
            return b.open_issues_count - a.open_issues_count;
        }

        // Activity (use pushed_at as last commit time)
        if (filters.activity === "asc") {
          if (a.pushed_at !== b.pushed_at)
            return (
              new Date(a.pushed_at).getTime() - new Date(b.pushed_at).getTime()
            );
        } else {
          if (a.pushed_at !== b.pushed_at)
            return (
              new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
            );
        }

        // Forks
        if (filters.forks === "asc") {
          return a.forks_count - b.forks_count;
        } else {
          return b.forks_count - a.forks_count;
        }
      });

      setRepos(sortedData);
      setLoading(false);
    }

    loadRepos();
  }, [filters]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Open Source Repo Finder</h1>
      <FilterBar filters={filters} setFilters={setFilters} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
