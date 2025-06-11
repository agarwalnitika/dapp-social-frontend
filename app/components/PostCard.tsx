// components/PostCard.tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";

interface PostCardProps {
  // user: any;
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
  // user,
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
      {/* <div className="flex items-center mb-2">
        <img
          src={user.profile_picture_url || "https://i.pravatar.cc/150?img=65"}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="text-sm text-gray-600">
          <div className="font-medium text-gray-800">{user.username}</div>
          <div className="text-xs text-gray-500">
            {user.wallet_address.slice(0, 6)}...
            {user.wallet_address.slice(-4)} •{" "}
            {new Date(timestamp).toLocaleString()}
          </div>
        </div>
      </div> */}

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
