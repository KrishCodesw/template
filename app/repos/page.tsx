// app/repos/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Repo } from "../types/github";
import RepoCard from "./RepoCard";
import FilterBar from "./Filters";

export default function ReposPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    stack: "Flutter",
    sort: "stars",
    order: "desc",
  });

  useEffect(() => {
    async function loadRepos() {
      setLoading(true);
      const res = await fetch(
        `/api/repos?stack=${filters.stack}&sort=${filters.sort}&order=${filters.order}`
      );
      const data = await res.json();
      setRepos(data);
      setLoading(false);
    }
    loadRepos();
  }, [filters]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Open Source Repo Finder</h1>
      {/* <FilterBar filters={filters} setFilters={setFilters} /> */}
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
