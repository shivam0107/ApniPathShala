import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './renderCartCourses';
import RenderTotalAmount from './renderTotalAmount';


const Cart = () => {
  const { total, totalItem } = useSelector((state) => state.cart);

  return (
    <div className='text-white'>
      <h1>Your Cart</h1>
      <p>{totalItem} Courses in Cart</p>

      {total > 0 ? (
        <div>
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p>Your Cart Is Empty</p>
      )}
    </div>
  );
}

export default Cart