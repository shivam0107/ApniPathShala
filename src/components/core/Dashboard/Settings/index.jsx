import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture';
import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';
const Settings = () => {
  return (
    <div className="space-y-5">
      <h1>Edit Profile</h1>
      {/* change profile picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* update password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </div>
  );
}

export default Settings;