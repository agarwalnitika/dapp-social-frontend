"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage } from "wagmi";
import { useRouter } from "next/navigation";

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

        const res = await fetch("http://localhost:3001/auth/verify", {
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Login to 🐦 Tweetlet</h1>
      <ConnectButton />
      {loading && <p className="mt-4 text-gray-600">Logging in...</p>}
    </div>
  );
}
