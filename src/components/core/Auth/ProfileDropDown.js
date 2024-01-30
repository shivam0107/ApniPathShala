import React from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../services/operations/authAPI';


function ProfileDropDown() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  function submitHandler() {
    dispatch(logout(navigate));
  }

  return (
    <div className="text-white flex gap-2">
      <button onClick={submitHandler} className="text-white">
        log out
      </button>
      <img
        src={user?.image}
        alt={`profile-${user?.firstName}`}
        className="aspect-square w-[30px] rounded-full object-cover"
      />
    </div>
  );
}

export default ProfileDropDown