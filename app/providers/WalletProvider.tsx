// ✅ app/components/WalletProvider.tsx
"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import {
  WALLET_CONNECT_APP_NAME,
  WALLET_CONNECT_PROJECT_ID,
} from "../helpers/config";

const { connectors } = getDefaultWallets({
  appName: WALLET_CONNECT_APP_NAME,
  projectId: WALLET_CONNECT_PROJECT_ID,
});

const config = createConfig({
  chains: [sepolia],
  connectors,
  transports: {
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          <UserProvider>{children}</UserProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default WalletProvider;
