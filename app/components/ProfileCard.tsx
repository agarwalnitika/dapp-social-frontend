"use client";

import { useUser } from "../providers/UserContext";

export default function ProfileCard({ onLogout }: { onLogout: () => void }) {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="p-2 hover:bg-gray-800 rounded-lg text-white">
      <div className="flex items-center space-x-3">
        <img
          src={user.profilePicture || "https://i.pravatar.cc/150?img=65"}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">
            {user.username || "User"}
          </div>
          <div className="text-xs text-gray-400 truncate">
            {user.walletAddress}
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
