"use client";

import { useEffect, useState } from "react";
import { Repo } from "../types/github";
import RepoCard from "./RepoCard";
import FilterBar from "./Filters";

export default function ReposPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery); // ✅ new
  const [filters, setFilters] = useState({
    stack: "",
    stars: "",
    issues: "",
    activity: "",
    forks: "",
  });

  // ✅ Debounce effect: waits 800ms after typing before updating debouncedQuery
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 800);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // reset page when search/filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, filters]);

  useEffect(() => {
    const controller = new AbortController();

    (async function loadRepos() {
      setLoading(true);

      // combine search + stack
      const qParts: string[] = [];
      if (debouncedQuery) qParts.push(debouncedQuery);
      if (filters.stack) qParts.push(`language:${filters.stack}`);
      const q = qParts.join(" ") || "stars:>0";

      const params = new URLSearchParams({
        q,
        page: String(page),
        per_page: "30",
        // let client-side handle final sort; don't force stars desc here
        // sort: "", order: ""
      });

      try {
        const res = await fetch(`/api/repos?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = await res.json();

        let sorted = [...data];

        // build comparators only for active filters
        const rules = [
          {
            key: "stars",
            cmp: (a: Repo, b: Repo) => a.stargazers_count - b.stargazers_count,
          },
          {
            key: "issues",
            cmp: (a: Repo, b: Repo) =>
              a.open_issues_count - b.open_issues_count,
          },
          {
            key: "activity",
            cmp: (a: Repo, b: Repo) =>
              new Date(a.pushed_at).getTime() - new Date(b.pushed_at).getTime(),
          },
          {
            key: "forks",
            cmp: (a: Repo, b: Repo) => a.forks_count - b.forks_count,
          },
        ].filter(
          (r) =>
            (filters as any)[r.key] === "asc" ||
            (filters as any)[r.key] === "desc"
        );

        if (rules.length) {
          sorted.sort((a, b) => {
            for (const r of rules) {
              const diff = r.cmp(a, b);
              if (diff !== 0)
                return (filters as any)[r.key] === "asc" ? diff : -diff;
            }
            return 0;
          });
        } else {
          // sensible default
          sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
        }

        setRepos(sorted);
      } catch (e: any) {
        if (e.name !== "AbortError") console.error(e);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [page, debouncedQuery, filters]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Open Source Repo Finder</h1>

      {/* Search bar */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by repo name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={() => setDebouncedQuery(searchQuery.trim())} // ✅ manual trigger
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </div>

      {/* Filters */}
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
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
