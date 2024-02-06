import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';

const RenderTotalAmount = () => {
    const { total , cart } = useSelector((state) => state.cart);

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought these course", courses);
        //TODO : API integrate buy course ki baad me karenge
    }

  return (
    <div>
      <p>total:</p>
      <p>Rs {total} </p>
      <p className="line-through">Rs 3000 </p>
      <IconBtn text="Buy Now" onclick={handleBuyCourse} customClasses={"w-full justify-center"} />
    </div>
  );
}

export default RenderTotalAmount