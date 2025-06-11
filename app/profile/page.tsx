"use client";

import RequireAuth from "../providers/RequireAuth";
import Sidebar from "../components/Sidebar";
import ProfilePageComponent from "./components/ProfilePage";

export default function ProfilePage() {
  return (
    <>
      <Sidebar />
      <ProfilePageComponent />
    </>
  );
}
