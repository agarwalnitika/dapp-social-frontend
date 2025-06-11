"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostCard from "@/app/components/PostCard";
import CommentList from "@/app/components/CommentsList";
import { handleComment, handleLike } from "@/app/feed/components/FeedComponent";
import { API_BASE_URL } from "@/app/helpers/config";

interface Post {
  id: number;
  wallet_address: string;
  content: string;
  timestamp: string;
  likeCount: number;
  commentCount: number;
}

interface Comment {
  id: number;
  wallet_address: string;
  content: string;
  timestamp: string;
}

export default function PostDetailsComponent() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPostDetails = async () => {
    try {
      const [postRes] = await Promise.all([
        fetch(`${API_BASE_URL}/posts/${id}`),
      ]);

      const postData = await postRes.json();

      setPost(postData);
      setComments(Array.isArray(postData.comments) ? postData.comments : []);
    } catch (err) {
      console.error("Error loading post or comments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPostDetails();
  }, [id]);

  const onLike = async (postId: number) => {
    await handleLike(postId);
    fetchPostDetails();
  };

  const onComment = async (postId: number, text: string) => {
    await handleComment(postId, text);
    fetchPostDetails();
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!post)
    return <p className="text-center mt-10 text-red-500">Post not found.</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">📝 Post Details</h1>
      <PostCard
        // user={{
        //   username: post.user.username,
        //   profile_picture_url: post.user.profile_picture_url,
        //   wallet_address: post.user.wallet_address,
        // }}
        walletAddress={post.wallet_address}
        timestamp={post.timestamp}
        content={post.content}
        likeCount={post.likeCount}
        commentCount={post.commentCount}
        onComment={(text) => onComment(post.id, text)}
        onLike={() => onLike(post.id)}
      />
      <CommentList comments={comments} />
    </div>
  );
}
