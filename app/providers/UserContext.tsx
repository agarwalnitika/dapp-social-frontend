"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/app/helpers/config";
import Spinner from "../components/Spinner";
import { getToken, removeToken, setToken } from "../helpers/token";

interface User {
  walletAddress: string;
  username?: string;
  bio?: string;
  profilePicture?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  loading: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// UserContext manages the authenticated user's state across the app
// It handles:
// - User authentication state (connected wallet)
// - stores and updates User profile data (username, bio, profile picture)
// - Automatic profile fetching when wallet connects
// - Loading states during authentication
// - Redirection to "/login" if wallet is not connected or user's wallet_address is not found.
// - manages the JWT in the local storage
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { address, isConnected } = useAccount();
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const fetchUser = async () => {
      if (!isConnected || !address) {
        // redirects only if user is already not on login page
        if (window.location.pathname !== "/login") {
          logout();
        }
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/users/${address}`);
        if (res.ok) {
          const data = await res.json();
          if (data.token) {
            setToken(data.token);
            setTokenState(data.token);
          }

          setUser({
            walletAddress: address,
            username: data.username,
            bio: data.bio,
            profilePicture: data.profilePicture,
          });
        } else {
          setUser({ walletAddress: address });
        }
      } catch (err) {
        console.error("Error fetching user profile", err);
        setUser({ walletAddress: address });
      } finally {
        setLoading(false);
      }
    };

    const existingToken = getToken();
    if (existingToken) {
      setTokenState(existingToken);
    }

    fetchUser();
  }, [isConnected, address]);

  const logout = () => {
    disconnect();
    setUser(null);
    setTokenState(null);
    removeToken();
    router.push("/login");
    setLoading(false);
  };

  const updateUserProfile = async (data: Partial<User>) => {
    if (!user?.walletAddress) return;

    const updated = {
      ...user,
      ...data,
      walletAddress: user.walletAddress,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_address: user.walletAddress,
          username: updated.username,
          bio: updated.bio,
          profile_picture_url: updated.profilePicture,
        }),
      });

      if (!res.ok) throw new Error("Failed to update user profile");

      setUser(updated); // update global context
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, logout, loading, updateUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
