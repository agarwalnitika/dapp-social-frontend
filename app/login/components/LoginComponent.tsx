"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";
import { useRouter } from "next/navigation";
import WalletConnectButton from "@/app/components/buttons/WalletButton";
import Spinner from "@/app/components/Spinner";
import { API_BASE_URL } from "@/app/helpers/config";

export default function LoginPageComponent() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const login = async () => {
      if (!address || !isConnected) return;

      setLoading(true);
      try {
        const message = "Login to Tweetlet";
        const signature = await signMessageAsync({ message });
        setLoading(true);

        const res = await fetch(`${API_BASE_URL}/auth/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address, signature }),
        });

        const data = await res.json();

        if (res.ok && data.token) {
          localStorage.setItem("token", data.token);
          router.push("/");
        } else {
          alert("Login failed: " + data.message || "Unknown error");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    login();
  }, [address, isConnected]);

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to 🐦 Tweetlet</h1>
      {/* <ConnectButton /> */}
      <WalletConnectButton />
      {loading && (
        <div className="mt-2">
          <Spinner size={20} />
        </div>
      )}
    </div>
  );
}
