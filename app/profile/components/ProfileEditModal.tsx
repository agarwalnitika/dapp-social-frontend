"use client";

import { isValidHttpUrl } from "@/app/helpers/apiHelper";
import { useState } from "react";

export default function ProfileEditModal({ profile, onClose, onSave }: any) {
  const [formData, setFormData] = useState(profile);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-lg shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">📝 Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 text-white rounded"
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 text-white rounded"
          />
          <input
            name="profile_picture_url"
            placeholder="Profile Picture URL"
            value={formData.profile_picture_url}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 text-white rounded"
          />
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>

        {isValidHttpUrl(formData.profile_picture_url) && (
          <div className="mt-6">
            <h2 className="font-medium">Preview:</h2>
            <img
              src={formData.profile_picture_url}
              alt="Profile"
              width={128}
              height={128}
              className="rounded-full border mt-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}
