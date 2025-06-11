"use client";

import { isValidHttpUrl } from "@/app/helper";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ProfileEditModal from "./ProfileEditModal";

interface UserProfile {
  wallet_address: string;
  username: string;
  bio: string;
  profile_picture_url: string;
}

export default function ProfilePageComponent() {
  const { address: walletAddress, isConnected } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    wallet_address: "",
    username: "",
    bio: "",
    profile_picture_url: "",
  });

  const [loading, setLoading] = useState(true);
  // const walletAddress = "0xYourWalletAddress"; // Replace with actual logic

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

  useEffect(() => {
    if (walletAddress) fetchProfile();
  }, [walletAddress]);

  const handleSave = async (updatedProfile: any) => {
    // e.preventDefault();

    try {
      console.log("porifle data", updatedProfile);
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedProfile,
          wallet_address: walletAddress,
        }),
      });

      fetchProfile();

      if (!res.ok) throw new Error("Failed to save profile");
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-gray-900 rounded-lg overflow-hidden shadow-md">
      {/* Edit Profile Button */}

      {/* Cover image */}
      <div className="relative h-48 bg-gray-800">
        <img
          src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1500&q=80"
          alt="Cover"
          className="w-full h-full object-cover"
        />

        {/* Profile picture */}
        <div className="absolute -bottom-12 left-6">
          <img
            src={
              profile?.profile_picture_url || "https://i.pravatar.cc/150?img=65"
            }
            alt="Profile"
            className="w-30 h-30 rounded-full border-4 border-gray-900 shadow-lg"
          />
        </div>
      </div>

      <div
        className="flex justify-end px-6 mt-4"
        onClick={() => setIsModalOpen(true)}
      >
        <button className="px-4 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition">
          Edit Profile
        </button>
      </div>

      {/* Profile info */}
      <div className="pt-8 px-6 pb-6 text-white">
        <h2 className="text-2xl font-semibold">
          {profile?.username || "Unnamed"}
        </h2>
        <p className="text-sm text-gray-400">{profile?.wallet_address}</p>
        <p className="mt-4 text-gray-300">
          {profile?.bio || "No bio available. Add one from profile settings."}
        </p>
      </div>

      {isModalOpen && (
        <ProfileEditModal
          profile={profile}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
