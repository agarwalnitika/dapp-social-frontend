// app/feed/page.tsx or app/feed.tsx
"use client";

import CreatePostForm from "@/app/components/CreatePost";
import PostCard from "@/app/components/PostCard";
import { API_BASE_URL } from "@/app/helpers/config";
import {
  addCommentOnPost,
  addLikeOnPost,
  getAllPosts,
} from "@/app/helpers/apiHelper";
import React, { useEffect, useState } from "react";
import { User, useUser } from "@/app/providers/UserContext";

interface Post {
  id: number;
  wallet_address: string;
  content: string;
  timestamp: string;
  likeCount: number;
  commentCount: number;
  user: User;
}

export default function FeedComponent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useUser();

  if (!user) return;

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(Array.isArray(data) ? data : []);
      console.log(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const onLike = async (postId: number) => {
    await addLikeOnPost(postId, user?.walletAddress);
    fetchPosts();
  };

  const onComment = async (postId: number, text: string) => {
    await addCommentOnPost(postId, text, user?.walletAddress);
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
            key={post.id}
            user={{
              username: post.user.username,
              profilePicture: post.user.profilePicture,
              walletAddress: post.wallet_address,
            }}
            timestamp={post.timestamp}
            content={post.content}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            onLike={() => onLike(post.id)}
            onComment={(text) => onComment(post.id, text)}
            postId={post.id}
            autoFocusComment={false}
          />
        ))
      )}
    </div>
  );
}
