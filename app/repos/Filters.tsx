import { Dispatch, SetStateAction, useState } from "react";

type Filters = {
  stack: string;
  stars: string;
  issues: string;
  activity: string;
  forks: string;
};

interface FilterBarProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleApply = () => {
    setFilters(localFilters);
  };

  const handleReset = () => {
    const reset: Filters = {
      stack: "",
      stars: "",
      issues: "",
      activity: "",
      forks: "",
    };
    setLocalFilters(reset);
    setFilters(reset);
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-xl shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Language */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Language
          </label>
          <select
            value={localFilters.stack}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, stack: e.target.value })
            }
            className="p-2 border rounded-lg"
          >
            <option value="">Default</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="solidity">Solidity</option>
            <option value="ruby">Ruby</option>
          </select>
        </div>

        {/* Stars */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Stars
          </label>
          <select
            value={localFilters.stars}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, stars: e.target.value })
            }
            className="p-2 border rounded-lg"
          >
            <option value="">Default</option>
            <option value="desc">High → Low</option>
            <option value="asc">Low → High</option>
          </select>
        </div>

        {/* Issues */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Issues
          </label>
          <select
            value={localFilters.issues}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, issues: e.target.value })
            }
            className="p-2 border rounded-lg"
          >
            <option value="">Default</option>
            <option value="desc">Most → Fewest</option>
            <option value="asc">Fewest → Most</option>
          </select>
        </div>

        {/* Activity */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Activity
          </label>
          <select
            value={localFilters.activity}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, activity: e.target.value })
            }
            className="p-2 border rounded-lg"
          >
            <option value="">Default</option>
            <option value="desc">Recently Active</option>
            <option value="asc">Less Active</option>
          </select>
        </div>

        {/* Forks */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Forks
          </label>
          <select
            value={localFilters.forks}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, forks: e.target.value })
            }
            className="p-2 border rounded-lg"
          >
            <option value="">Default</option>
            <option value="desc">High → Low</option>
            <option value="asc">Low → High</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
