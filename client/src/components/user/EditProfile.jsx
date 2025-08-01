import React, { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../../store/Users/user-slice";
import { updateUser } from "../../store/Users/user-action";
import { toast } from "react-toastify";
import { useTheme } from "../../context/ThemeContext";
import { X, Lock as LockIcon } from "lucide-react";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, errors } = useSelector((state) => state.user);
  const { isDarkMode } = useTheme();

  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar?.url || "https://i.pravatar.cc/150?img=15"
  );

  const originalUserData = {
    name: user?.name || "",
    phoneNumber: user?.phoneNumber || "",
    avatar: user?.avatar?.url || "",
  };

  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        form.setFieldValue("avatar", reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (errors && errors.length > 0) {
      toast.error(errors);
      dispatch(userActions.clearError());
    } else if (user) {
      form.setFieldValue("name", user.name);
      form.setFieldValue("phoneNumber", user.phoneNumber);
      form.setFieldValue(
        "avatar",
        user.avatar.url || "https://i.pravatar.cc/150?img=9"
      );
    }
  }, [user]);

  const form = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      avatar: "",
    },
    onSubmit: ({ value }) => {
      const updateFields = {};
      if (value.name !== originalUserData.name) updateFields.name = value.name;
      if (value.phoneNumber !== originalUserData.phoneNumber)
        updateFields.phoneNumber = value.phoneNumber;
      if (value.avatar !== originalUserData.avatar)
        updateFields.avatar = value.avatar;

      if (Object.keys(updateFields).length === 0) {
        toast.info("No changes made");
        return;
      }

      dispatch(updateUser(updateFields));
      navigate("/profile");
      toast.success("Profile updated");
    },
  });

  const themeClasses = isDarkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "bg-gradient-to-br from-orange-50 via-white to-pink-50 text-gray-900";

  const cardClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50"
    : "bg-white/70 border-gray-200/50";

  const inputClasses = isDarkMode
    ? "bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
    : "bg-white/70 border-gray-300/50 text-gray-900 placeholder-gray-500";

  return (
    <div
      className={`min-h-screen ${themeClasses} flex items-center justify-center px-4 transition-all duration-500`}
    >
      <div
        className={`relative border ${cardClasses} backdrop-blur-sm p-8 rounded-3xl shadow-xl max-w-md w-full transition-all duration-500`}
      >
        {/* X button inside the card */}
        <button
          onClick={() => navigate("/profile")}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isDarkMode
              ? "hover:bg-gray-700 text-gray-400 hover:text-white"
              : "hover:bg-gray-200 text-gray-600 hover:text-gray-900"
          } transition-all duration-300`}
        >
          <X className="w-6 h-6" />
        </button>

        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent text-center">
          Update Profile
        </h1>
        <form
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="name">
            {(field) => (
              <div className="mb-6">
                <label className="block mb-2 text-sm">Name</label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${inputClasses} focus:ring-2 focus:ring-orange-500 outline-none transition-all duration-300`}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="phoneNumber">
            {(field) => (
              <div className="mb-6">
                <label className="block mb-2 text-sm">Phone Number</label>
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${inputClasses} focus:ring-2 focus:ring-orange-500 outline-none transition-all duration-300`}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="avatar">
            {(field) => (
              <div className="mb-6">
                <label className="block mb-2 text-sm">Avatar</label>
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 hover:border-orange-500 transition-all duration-300">
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-orange-500 file:to-pink-500 file:text-white hover:file:brightness-110 transition-all duration-300"
                  />
                </div>
              </div>
            )}
          </form.Field>

          <button
            type="submit"
            style={{ borderRadius: "18px" }}
            className="w-full py-3 rounded-2xl mb-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg hover:scale-105"
          >
            Update
          </button>

          <Link
            to="/user/updatePassword"
            className="flex items-center justify-center w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-semibold shadow-lg hover:scale-105"
          >
            <LockIcon className="w-5 h-5 mr-2" />
            <span>Change Password</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
