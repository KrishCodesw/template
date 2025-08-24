"use client";

import { useState } from "react";
import { Bookmark, ThumbsUp, ExternalLink } from "lucide-react"; // icons

export default function RepoCard({ repo, onBookmark, onUpvote }: any) {
  const [bookmarked, setBookmarked] = useState(false);
  const [upvoted, setUpvoted] = useState(false);

  return (
    <div className="bg-gray-900 text-white rounded-2xl shadow-md p-4 flex flex-col justify-between w-full max-w-md">
      {/* Repo Info */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold">{repo.full_name}</h2>
        <p className="text-sm text-gray-400">Owner: {repo.owner.login}</p>
        <div className="flex gap-4 text-sm text-gray-300 mt-1">
          <span>⭐ {repo.stargazers_count}</span>
          <span>🍴 {repo.forks}</span>
          <span>{repo.language}</span>
        </div>
        <span>Number of issues: {repo.open_issues}</span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
        {repo.description || "No description available"}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-between items-center border-t border-gray-700 pt-3">
        {/* Bookmark */}
        <button
          onClick={() => {
            setBookmarked(!bookmarked);
            onBookmark?.(repo);
          }}
          className={`p-2 rounded-lg ${
            bookmarked ? "bg-green-600" : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          <Bookmark className="w-5 h-5" />
        </button>

        {/* Upvote */}
        <button
          onClick={() => {
            setUpvoted(!upvoted);
            onUpvote?.(repo);
          }}
          className={`p-2 rounded-lg ${
            upvoted ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          <ThumbsUp className="w-5 h-5" />
        </button>

        {/* GitHub / Share */}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
