import React, { useState, useRef } from "react";

export default function ProfilePage() {
  // Initial user data — replace with your real user data or fetch it
  const userDateils = JSON.parse(localStorage.getItem("userDetails")).data;
  const initialUser = {
    name: userDateils.UserName,
    email: userDateils.UserRole,
    profilePicUrl: userDateils.ProfilePic,
  };
  const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [setNewProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleEditToggle = () => {
    setEditMode(!editMode);
    // Reset form values on cancel
    if (editMode) {
      setNewName(user.name);
      setNewEmail(user.email);
      setNewProfilePic(null);
      setPreview(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // You would send updated data & newProfilePic to your backend here
    const updatedUser = {
      name: newName,
      email: newEmail,
      profilePicUrl: preview || user.profilePicUrl,
    };
    setUser(updatedUser);
    setEditMode(false);
    setNewProfilePic(null);
    setPreview(null);
    alert("Profile updated!");
  };

  return (
    <div className=" mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
          <img
            src={preview || user.profilePicUrl}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>

        {editMode && (
          <>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => fileInputRef.current.click()}
            >
              Change Profile Picture
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </>
        )}
      </div>

      <div className="space-y-4 ">
        <div className="flex gap-4">
          <label className="block text-gray-700 mb-1">Name:</label>
          {editMode ? (
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          ) : (
            <p className="text-gray-900">{user.name}</p>
          )}
        </div>

        <div className="flex gap-4">
          <label className="block text-gray-700 mb-1">Email:</label>
          {editMode ? (
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          ) : (
            <p className="text-gray-900">{user.email}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleEditToggle}
              className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEditToggle}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
