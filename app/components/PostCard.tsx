"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CustomOutlineButton from "./buttons/CustomButton";
import { User } from "../providers/UserContext";
import { formatTimestamp } from "../helpers/utils";

interface PostCardProps {
  user: User;
  timestamp: string;
  content: string;
  likeCount: number;
  commentCount: number;
  onLike: () => void;
  onComment: (text: string) => void;
  postId?: number;
  autoFocusComment?: boolean;
}

export default function PostCard({
  user,
  timestamp,
  content,
  likeCount,
  commentCount,
  onLike,
  onComment,
  postId,
  autoFocusComment,
}: PostCardProps) {
  const [comment, setComment] = useState("");
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [showCommentBox, setShowCommentBox] = useState(!!autoFocusComment);
  const isPostPage = !!autoFocusComment;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && onComment) {
      onComment(comment.trim());
      setComment("");
    }
  };

  useEffect(() => {
    if (autoFocusComment) {
      setTimeout(() => commentInputRef.current?.focus(), 0);
    }
  }, [autoFocusComment]);

  const handleFocusComment = () => {
    setShowCommentBox(!showCommentBox);
    setTimeout(() => commentInputRef.current?.focus(), 0); // ensure it's rendered first
  };

  const likeSection = (
    <button
      onClick={onLike}
      className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 fill-current"
        viewBox="0 0 20 20"
      >
        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
      </svg>
      <span>{likeCount}</span>
    </button>
  );

  const commentSection = (
    <div
      className="flex items-center space-x-1 hover:text-white cursor-pointer"
      onClick={handleFocusComment}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 fill-current"
        viewBox="0 0 20 20"
      >
        <path d="M18 10c0 3.866-3.582 7-8 7a8.979 8.979 0 01-4.906-1.496L2 17l1.703-3.562A7.983 7.983 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
      </svg>
      <span>{commentCount}</span>
    </div>
  );

  const bodySection = (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900 dark:text-white">
            {user.username || "Unnamed"}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            @{user.walletAddress.slice(0, 6)}...
            {user.walletAddress.slice(-4)}
          </span>
        </div>
        <span className="text-sm text-gray-400">
          {formatTimestamp(timestamp)}
        </span>
      </div>

      <p className="text-gray-800 dark:text-gray-300 mt-1 whitespace-pre-wrap">
        {content}
      </p>
    </>
  );

  return (
    <div
      className={`bg-white dark:bg-gray-900 p-4 rounded-lg shadow mb-4 ${
        !isPostPage && "hover:bg-gray-800"
      } transition`}
    >
      {/* User Info Header */}
      <div className="flex items-start">
        <img
          src={user.profilePicture || "https://i.pravatar.cc/150?img=65"}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <div className="flex-1">
          {!isPostPage ? (
            <Link href={`/post/${postId}?focusComment=true`}>
              {bodySection}
            </Link>
          ) : (
            bodySection
          )}

          {/* Post Actions */}
          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 pt-2">
            {likeSection}

            {!isPostPage ? (
              <Link href={`/post/${postId}?focusComment=true`}>
                {commentSection}
              </Link>
            ) : (
              commentSection
            )}
          </div>
        </div>
      </div>

      {/* Comment Box */}
      {isPostPage && showCommentBox && (
        <form onSubmit={handleCommentSubmit} className="flex space-x-2 mt-3">
          <input
            ref={commentInputRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm dark:bg-gray-800 dark:text-white"
          />
          <CustomOutlineButton onClick={() => {}} text="Send" />
        </form>
      )}
    </div>
  );
}
