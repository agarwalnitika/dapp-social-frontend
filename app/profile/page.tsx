"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { isValidHttpUrl } from "../helper";

interface UserProfile {
  wallet_address: string;
  username: string;
  bio: string;
  profile_picture_url: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    wallet_address: "",
    username: "",
    bio: "",
    profile_picture_url: "",
  });

  const [loading, setLoading] = useState(true);
  const walletAddress = "0xYourWalletAddress"; // Replace with actual logic

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3001/users/${walletAddress}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("Profile not found or error fetching profile.", err);
      } finally {
        setLoading(false);
      }
    };

    if (walletAddress) fetchProfile();
  }, [walletAddress]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("porifle data", profile);
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...profile, wallet_address: walletAddress }),
      });

      if (!res.ok) throw new Error("Failed to save profile");
      alert("Profile saved successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Error saving profile");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h1 className="text-2xl font-semibold mb-6">🧑‍💼 Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          placeholder="Username"
          value={profile.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={profile.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="profile_picture_url"
          placeholder="Profile Picture URL"
          value={profile.profile_picture_url}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Profile
        </button>
      </form>

      {isValidHttpUrl(profile.profile_picture_url) && (
        <div className="mt-6">
          <h2 className="font-medium">Preview:</h2>
          <img
            src={
              profile.profile_picture_url || "https://i.pravatar.cc/150?img=65"
            }
            alt="Profile"
            width={128}
            height={128}
            className="rounded-full border"
          />
        </div>
      )}
    </div>
  );
}
