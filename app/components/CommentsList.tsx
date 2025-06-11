"use client";

import React from "react";

interface Comment {
  id: number;
  wallet_address: string;
  content: string;
  timestamp: string;
}

export default function CommentList({ comments }: { comments: Comment[] }) {
  if (!comments.length)
    return <p className="text-sm text-gray-500">No comments yet.</p>;

  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-lg font-semibold mb-2">🗨️ Comments</h2>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border rounded-md p-2 text-sm bg-gray-50 shadow-sm"
        >
          <p className="font-semibold">{comment.wallet_address}</p>
          <p className="text-gray-700">{comment.content}</p>
          <p className="text-xs text-gray-400">
            {new Date(comment.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
