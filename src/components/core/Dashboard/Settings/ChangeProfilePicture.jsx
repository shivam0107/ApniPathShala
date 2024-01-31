import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useEffect } from "react";

const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef();


  //abhi nahi samjha
  const handleClick = () => {
    fileInputRef.current.click();
  };
  // console.log("token" , token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleOnChange = (e) => {
    const file = e.target.files[0];
    // console.log("File", file);

    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      // console.log("uploading...");
      setLoading(true);

      //create object of Form data
      const formData = new FormData();
      // console.log("form data" : formData);
      formData.append("displayPicture", imageFile);

      //dispatch image file upload
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);
    
    
  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
      <div className="flex items-center gap-x-4">
        <div>
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-richblack-25">Change Profile Picture</p>
          <div className="flex gap-4">
            <label htmlFor="input-file">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg , image/jpg"
                id="input-file"
                onChange={handleOnChange}
                className={`${
                  imageFile ? "block" : "hidden"
                } bg-richblack-600 p-4 rounded-md text-richblack-25 `}
              />
            </label>
            <button
              onClick={handleClick}
              disabled={loading}
              className={` ${
                imageFile ? "hidden" : "block"
              }  cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50`}
            >
              Select
            </button>

            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onclick={handleFileUpload}
            >
              {!loading && (
                <FaCloudUploadAlt className="text-lg text-richblack-900" />
              )}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
