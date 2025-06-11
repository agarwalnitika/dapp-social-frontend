"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getToken } from "../auth/utils/token";
import { useAccount } from "wagmi";

interface Profile {
  username?: string;
  wallet_address?: string;
  profile_picture_url?: string;
}

export default function ProfileCard({ onLogout }: { onLogout: () => void }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        if (!address || !token) return;

        const res = await fetch(`http://localhost:3001/users/${address}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          //   onLogout();
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    fetchProfile();
  }, [address]);

  if (!profile) return null;

  return (
    <div className="p-2 hover:bg-gray-800 rounded-lg text-white">
      <div className="flex items-center space-x-3">
        <img
          src={
            profile?.profile_picture_url || "https://i.pravatar.cc/150?img=65"
          }
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">
            {profile?.username || "User"}
          </div>
          <div className="text-xs text-gray-400 truncate">
            {profile?.wallet_address}
          </div>
        </div>
      </div>

      {onLogout && (
        <div className="mt-2 text-right">
          <button
            onClick={onLogout}
            className="text-xs text-red-400 hover:text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
