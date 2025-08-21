// app/repos/components/FilterBar.tsx
export default function FilterBar({ filters, setFilters }: any) {
  return (
    <div className="mb-4 flex gap-4">
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
      </select>

      <select
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
      >
        <option value="stars">Stars</option>
        <option value="forks">Forks</option>
        <option value="updated">Recently Updated</option>
      </select>
    </div>
  );
}
