// app/signin/page.tsx
"use client";

import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useState } from "react";

export default function SignIn() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [signature, setSignature] = useState("");
  const [status, setStatus] = useState("");

  const handleSignIn = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const message = "Login to ";

    try {
      const sig = await signer.signMessage(message);
      setSignature(sig);

      console.log("Address:", address);
      console.log("Signature:", signature);
      console.log("Message:", message);
      const res = await fetch("http://localhost:3001/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, signature: sig }),
      });

      const { token } = await res.json();
      localStorage.setItem("token", token);
      setStatus(res.ok ? "✅ Verified" : `❌ ${token || "Failed"}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Signing failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <ConnectButton />
      {isConnected && (
        <>
          <p className="text-sm text-gray-600">Connected: {address}</p>
          <button
            onClick={disconnect}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Disconnect
          </button>
          <button
            onClick={handleSignIn}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Sign & Login
          </button>
        </>
      )}
      {signature && (
        <div className="text-xs break-all">
          <strong>Signature:</strong> {signature}
        </div>
      )}
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}
