import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RenderSteps from "../AddCourses/RenderSteps";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";

const EditCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token);
      if (result?.courseDetails) {
        dispatch(setEditCourse(true));
        console.log("result of edit course", result);
        dispatch(setCourse(result?.courseDetails));
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("courses", course);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="text-white">
      <h1>Edit Course</h1>
      <div>{course ? <RenderSteps /> : <p>Course Not Found</p>}</div>
    </div>
  );
};

export default EditCourse;
