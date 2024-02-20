import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./renderCartCourses";
import RenderTotalAmount from "./renderTotalAmount";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="text-white ">
      <h1>Your Cart</h1>
      <p>{totalItems} Courses in Cart</p>

      {total > 0 ? (
        <div className="flex pt-2 border-t-[1px] gap-2 justify-between mt-5 ">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p>Your Cart Is Empty</p>
      )}
    </div>
  );
};

export default Cart;
