"use client";

import React, { useState } from "react";
import { useUser } from "@/app/providers/UserContext";
import ProfileEditModal from "./ProfileEditModal";
import CustomOutlineButton from "@/app/components/buttons/CustomButton";

export default function ProfilePageComponent() {
  const { user, updateUserProfile } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) return <p>Loading...</p>;

  const handleSave = async (updatedProfile: any) => {
    await updateUserProfile({
      username: updatedProfile.username,
      bio: updatedProfile.bio,
      profilePicture: updatedProfile.profile_picture_url,
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 bg-gray-900 rounded-lg overflow-hidden shadow-md">
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
            src={user.profilePicture || "https://i.pravatar.cc/150?img=65"}
            alt="Profile"
            className="w-30 h-30 rounded-full border-4 border-gray-900 shadow-lg"
          />
        </div>
      </div>

      {/* Edit Button */}
      <div className="flex justify-end px-6 mt-4">
        <CustomOutlineButton
          onClick={() => setIsModalOpen(true)}
          text="Edit Profile"
        />
      </div>

      {/* Profile info */}
      <div className="pt-8 px-6 pb-6 text-white">
        <h2 className="text-2xl font-semibold">{user.username || "Unnamed"}</h2>
        <p className="text-sm text-gray-400">{user.walletAddress}</p>
        <p className="mt-4 text-gray-300">
          {user.bio || "No bio available. Add one from profile settings."}
        </p>
      </div>

      {isModalOpen && (
        <ProfileEditModal
          profile={{
            username: user.username || "",
            bio: user.bio || "",
            profile_picture_url: user.profilePicture || "",
            wallet_address: user.walletAddress,
          }}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
