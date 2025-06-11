// components/PostCard.tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";

interface PostCardProps {
  walletAddress: string;
  timestamp: string;
  content: string;
  likeCount: number;
  commentCount: number;
  onLike?: () => void;
  onComment?: (text: string) => void;
  postId?: number;
}

export default function PostCard({
  walletAddress,
  timestamp,
  content,
  likeCount,
  commentCount,
  onLike,
  onComment,
  postId,
}: PostCardProps) {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && onComment) {
      onComment(comment.trim());
      setComment("");
    }
  };

  const cardContent = (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="text-sm text-gray-600 mb-1">
        <span className="font-medium">{walletAddress}</span> •{" "}
        {new Date(timestamp).toLocaleString()}
      </div>
      <p className="text-gray-800 mb-2">{content}</p>
      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
        <button onClick={onLike} className="hover:text-blue-500">
          ❤️ {likeCount}
        </button>
        <span>💬 {commentCount}</span>
      </div>

      <form onSubmit={handleCommentSubmit} className="flex space-x-2 mt-2">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded px-2 py-1 text-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white text-sm px-3 py-1 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );

  return (
    <>
      {postId ? (
        <Link href={`/post/${postId}`}>{cardContent}</Link>
      ) : (
        cardContent
      )}
    </>
  );
}
