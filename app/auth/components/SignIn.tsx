// components/SignIn.tsx
"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useState } from "react";
import { ethers } from "ethers";

export default function SignIn() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [signature, setSignature] = useState("");

  const handleSign = async () => {
    if (!window.ethereum) return alert("Install MetaMask!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const message = "Login to d";
    const signature = await signer.signMessage(message);
    setSignature(signature);

    console.log("Address:", await signer.getAddress());
    console.log("Signature:", signature);

    // Optionally send to backend
    const response = await fetch("http://localhost:3000/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: await signer.getAddress(),
        signature: signature,
      }),
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="p-4 space-y-4">
      {isConnected ? (
        <>
          <p>Connected: {address}</p>
          <button
            onClick={disconnect}
            className="bg-red-500 text-white px-3 py-1"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={() => connect({ connector: injected() })}
          className="bg-blue-500 text-white px-3 py-1"
        >
          Connect Wallet
        </button>
      )}
      {isConnected && (
        <button
          onClick={handleSign}
          className="bg-green-500 text-white px-3 py-1"
        >
          Sign Message
        </button>
      )}
      {signature && (
        <div>
          <p className="font-mono text-xs break-all">Signature:</p>
          <pre className="text-xs break-all">{signature}</pre>
        </div>
      )}
    </div>
  );
}
