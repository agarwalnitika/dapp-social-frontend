"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import PostCard from "@/app/components/PostCard";
import CommentList from "@/app/components/CommentsList";

import { API_BASE_URL } from "@/app/helpers/config";
import {
  addCommentOnPost,
  addLikeOnPost,
  getPostById,
} from "@/app/helpers/apiHelper";
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
  const { user } = useUser();
  const searchParams = useSearchParams();
  const focusComment = searchParams.get("focusComment") === "true";

  if (!user) return;

  const fetchPostDetails = async () => {
    try {
      const postData = await getPostById(id as string);
      setPost(postData);
      console.log(postData);
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
    await addLikeOnPost(postId, user?.walletAddress);
    fetchPostDetails();
  };

  const onComment = async (postId: number, text: string) => {
    await addCommentOnPost(postId, text, user?.walletAddress);
    fetchPostDetails();
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!post)
    return <p className="text-center mt-10 text-red-500">Post not found.</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">📝 Post Details</h1>
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
        onComment={(text) => onComment(post.id, text)}
        onLike={() => onLike(post.id)}
        autoFocusComment={focusComment}
      />
      <CommentList comments={comments} />
    </div>
  );
}
