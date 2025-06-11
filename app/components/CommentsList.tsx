/**
 * CommentsList component
 * Displays a list of comments for a post with user information and timestamps
 */
"use client";

import React from "react";
import { formatTimestamp } from "../helpers/utils";
import { User } from "../providers/UserContext";

/**
 * Represents a comment in the social feed
 */
interface Comment {
  id: number;
  wallet_address: string;
  content: string;
  timestamp: string;
  user: User;
}

export default function CommentList({ comments }: { comments: Comment[] }) {
  if (!comments.length)
    return <p className="text-sm text-gray-500 mt-4">No comments yet.</p>;

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold mb-2">🗨️ Comments</h2>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm"
        >
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={
                comment.user.profilePicture ||
                "https://i.pravatar.cc/150?img=65"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span className="font-medium text-gray-800 dark:text-white">
                {comment.wallet_address.slice(0, 6)}...
                {comment.wallet_address.slice(-4)}
              </span>
              <span className="text-xs text-gray-400">
                {formatTimestamp(comment.timestamp)}
              </span>
            </div>
            <p className="text-gray-800 dark:text-gray-100 text-sm">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
