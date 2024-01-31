import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authenticationSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  confirmPassword,
  password,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        confirmPassword,
        password,
        otp,
      });
      console.log("SIGNUP API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    }
    catch (error)
    {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
      }
       dispatch(setLoading(false));
       toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE.....", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      //fetch user image
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : //if not user image then generate image by name
          `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      //dispacthc user data
      dispatch(setUser({ ...response.data.user, image: userImage }));

      //set token to localstorage
      localStorage.setItem("token", JSON.stringify(response.data.token));
     
      //set user to localstorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function getPasswordResetToken(email, setEmailSent) {
  console.log("email", email);
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("RESET PASSWORD TOKEN RESPONSE", response);
      if (!response.data.success) {
        throw new Error((await response).data.message);
      }
      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN ERROR", error);
      toast.error("Faild to send email for Reset Password");
    }

    dispatch(setLoading(false));
  };
}

export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });
      console.log("RESET PASSWORD RESPONSE...", response);
      if (!response.data.success) {
        throw new Error((await response).data.message);
      }
      toast.success("Password has been Reset successfully");
    } catch (error) {
      console.log("RESET PASSWORD ERROR", error);
      toast.error("Faild to Reset Password");
    }

    dispatch(setLoading(false));
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}
