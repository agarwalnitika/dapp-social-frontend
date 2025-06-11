import WalletProvider from "./providers/WalletProvider";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "./fontawesome";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
