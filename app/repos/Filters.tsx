import React from "react";
import { Repo, RepoFilters } from "../types/github";

interface FiltersProps {
  filters: Repo;
  setFilters: (f: RepoFilters) => void;
  languages: string[];
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  setFilters,
  languages,
}) => {
  return (
    <>
      <div className="flex flex-wrap gap-4 p-2 border-b bg-gray-50">
        {/* Stars */}
        <input
          type="number"
          placeholder="Min Stars"
          value={filters.stargazers_count || ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              stargazers_count: Number(e.target.value),
            })
          }
          className="border p-1 rounded"
        />

        {/* Forks */}
        <input
          type="number"
          placeholder="Min Forks"
          value={filters.forks_count || ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              forks_count: Number(e.target.value),
            })
          }
          className="border p-1 rounded"
        />

        {/* Issues */}
        <input
          type="number"
          placeholder="Min Issues"
          value={filters.open_issues_count || ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              open_issues_count: Number(e.target.value),
            })
          }
          className="border p-1 rounded"
        />

        {/* Language */}
        <select
          value={filters.language || ""}
          onChange={(e) => setFilters({ ...filters, language: e.target.value })}
          className="border p-1 rounded"
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Filters;
