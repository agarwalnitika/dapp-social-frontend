"use client";

import { useState } from "react";
import CustomOutlineButton from "./buttons/CustomButton";
import { useAccount } from "wagmi";
import { API_BASE_URL } from "../helpers/config";

export default function CreatePostForm({
  onPostCreated,
}: {
  onPostCreated: () => void;
}) {
  const [content, setContent] = useState("");
  const { address: walletAddress } = useAccount();
  const [loading, setLoading] = useState(false);
  const MAX_CHAR = 280;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet_address: walletAddress, content }),
      });

      if (!res.ok) throw new Error("Failed to create post");

      setContent("");
      onPostCreated(); // refresh feed
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 border rounded-lg shadow-sm"
    >
      <textarea
        className="w-full p-2 border rounded-md resize-none"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        maxLength={MAX_CHAR}
      />

      <div className="flex items-center justify-between mt-2">
        <span
          className={`text-sm ${
            content.length >= MAX_CHAR
              ? "text-red-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {content.length}/{MAX_CHAR}
        </span>

        <CustomOutlineButton
          text={loading ? "Posting..." : "Post"}
          onClick={() => {}}
          disabled={loading || content.length === 0}
        />
      </div>
    </form>
  );
}
