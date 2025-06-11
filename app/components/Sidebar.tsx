"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDisconnect } from "wagmi";
import { removeToken, isLoggedIn } from "../auth/utils/token";
import ProfileCard from "./ProfileCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const router = useRouter();
  const { disconnect } = useDisconnect();

  const handleLogout = () => {
    removeToken();
    disconnect();
    router.push("/login");
  };

  if (!isLoggedIn()) return null;

  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-gray-900 text-white p-6 flex flex-col justify-between">
      <div className="space-y-6">
        <Link href="/" className="text-2xl font-extrabold hover:text-gray-300">
          🐦 Tweetlet
        </Link>
        <nav className="flex flex-col space-y-4 mt-10 ">
          <Link href="/" className="hover:text-gray-300 gap-4 flex">
            <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </Link>
        </nav>
      </div>
      <Link href="/profile">
        <div className="border-t border-gray-700 pt-4">
          <ProfileCard onLogout={handleLogout} />
        </div>
      </Link>
    </aside>
  );
}
