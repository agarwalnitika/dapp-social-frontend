"use client";

import RequireAuth from "../auth/components/RequireAuth";
import Sidebar from "../components/Sidebar";
import ProfilePageComponent from "./components/ProfilePage";

export default function ProfilePage() {
  return (
    <RequireAuth>
      <Sidebar />
      <ProfilePageComponent />
    </RequireAuth>
  );
}
