import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { buyCourse } from "../../../../services/operations/studentsFeaturesAPI";
import { useNavigate } from "react-router-dom";

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("Bought these course", courses);
    buyCourse(courses, token, user, navigate, dispatch);
  };

  return (
    <div className="bg-richblack-700 p-8 h-fit rounded-md">
      <p>total:</p>
      <p>Rs {total} </p>
      <p className="line-through">Rs 3000 </p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses={"w-full justify-center"}
      />
    </div>
  );
};

export default RenderTotalAmount;
