"use client";

import { useState } from "react";
import { useUser } from "../providers/UserContext";
import CustomOutlineButton from "./buttons/CustomButton";
import { createPost } from "../helpers/apiHelper";

export default function CreatePostForm({
  onPostCreated,
}: {
  onPostCreated: () => void;
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const MAX_CHAR = 280;
  const { user } = useUser();

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await createPost(user.walletAddress, content);
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
      className="mb-6 p-4 rounded-xl shadow-sm bg-gray-900 text-white"
    >
      <div className="flex gap-4">
        {/* Profile Picture */}
        <img
          src={user?.profilePicture || "https://i.pravatar.cc/150?img=65"}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Textarea and controls */}
        <div className="flex-1">
          <textarea
            className="w-full p-3 bg-gray-800 text-white rounded-lg resize-none border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            maxLength={MAX_CHAR}
          />

          <div className="flex justify-between items-center mt-2">
            <span
              className={`text-xs ${
                content.length >= MAX_CHAR ? "text-red-400" : "text-gray-400"
              }`}
            >
              {content.length}/{MAX_CHAR}
            </span>

            <CustomOutlineButton
              text={loading ? "Posting..." : "Post"}
              onClick={() => {}}
              disabled={loading || content.trim().length === 0}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
