// app/repos/components/FilterBar.tsx
export default function FilterBar({ filters, setFilters }: any) {
  return (
    <div className="mb-4 flex flex-wrap gap-4">
      {/* Tech bucket */}
      <select
        value={filters.stack}
        onChange={(e) => setFilters({ ...filters, stack: e.target.value })}
      >
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="go">Go</option>
        <option value="rust">Rust</option>
        <option value="solidity">Solidity</option>
      </select>

      {/* Stars */}
      <select
        value={filters.stars}
        onChange={(e) => setFilters({ ...filters, stars: e.target.value })}
      >
        <option value="desc">Stars ↓</option>
        <option value="asc">Stars ↑</option>
      </select>

      {/* Issues */}
      <select
        value={filters.issues}
        onChange={(e) => setFilters({ ...filters, issues: e.target.value })}
      >
        <option value="desc">Issues ↓</option>
        <option value="asc">Issues ↑</option>
      </select>

      {/* Activity */}
      <select
        value={filters.activity}
        onChange={(e) => setFilters({ ...filters, activity: e.target.value })}
      >
        <option value="desc">Active ↓</option>
        <option value="asc">Less Active ↑</option>
      </select>

      {/* Forks */}
      <select
        value={filters.forks}
        onChange={(e) => setFilters({ ...filters, forks: e.target.value })}
      >
        <option value="desc">Forks ↓</option>
        <option value="asc">Forks ↑</option>
      </select>
    </div>
  );
}
