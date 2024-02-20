import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("GET_USER_ENROLLED_COURSES_API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.Error);
    }

    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not fetch course details");
  }

  toast.dismiss(toastId);
  return result;
}

export async function getInstructorData(token) {
  const toastId = toast.loading("loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_INSTRUCTOR_DATA_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses;
  } catch (error) {
    console.log("GET_INSTRUCTOR_API_ERROR", error);
    toast.error("Could Not get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}
