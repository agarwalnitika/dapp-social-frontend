// app/feed/page.tsx or app/feed.tsx
"use client";

import CreatePostForm from "@/app/components/CreatePost";
import PostCard from "@/app/components/PostCard";
import React, { useEffect, useState } from "react";

interface Post {
  id: number;
  wallet_address: string;
  content: string;
  timestamp: string;
  likeCount: number;
  commentCount: number;
  user: {
    username: string;
    profile_picture_url: string;
    wallet_address: string;
  };
}

export default function FeedComponent() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:3001/posts");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onLike = async (postId: number) => {
    await handleLike(postId);
    fetchPosts();
  };

  const onComment = async (postId: number, text: string) => {
    await handleComment(postId, text);
    fetchPosts();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-semibold mb-4">📢 Public Feed</h1>
      <CreatePostForm onPostCreated={fetchPosts} />

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            // user={{
            //   username: post.user.username,
            //   profile_picture_url: post.user.profile_picture_url,
            //   wallet_address: post.user.wallet_address,
            // }}
            key={post.id}
            walletAddress={post.wallet_address}
            timestamp={post.timestamp}
            content={post.content}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            onLike={() => onLike(post.id)}
            onComment={(text) => onComment(post.id, text)}
            postId={post.id}
          />
        ))
      )}
    </div>
  );
}

export const handleLike = async (postId: number) => {
  try {
    await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId,
        wallet_address: "0x123", // temp hardcoded
      }),
    });
  } catch (err) {
    console.error("Like error:", err);
  }
};

export const handleComment = async (postId: number, text: string) => {
  try {
    await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId,
        text,
        wallet_address: "0x123", // temp hardcoded
      }),
    });
  } catch (err) {
    console.error("Comment error:", err);
  }
};
