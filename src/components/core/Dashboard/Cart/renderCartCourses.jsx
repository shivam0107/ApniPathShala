import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { GiNinjaStar } from 'react-icons/gi'
import { MdOutlineDeleteSweep } from 'react-icons/md' 
import { removeFromCart } from '../../../../slices/cartSlice'

const RenderCartCourses = () => {
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch();
  return (
      <div>
          {
              cart.map((course, index) => {
                  <div>
                    <div>
                      <img src={course?.thumbnail} />
                      <div>
                        <p>{course?.name}</p>
                        <p>{course?.category?.name}</p>
                        <div>
                          <span>4.8</span>
                          <ReactStars
                            count={5}
                            size={20}
                            edit={false}
                            activeColor="#ffd700"
                            emptyIcon={<GiNinjaStar />}
                            fullIcon={<GiNinjaStar />}
                                  />
                                  <span>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                      </div>
                      </div>


                      <div>
                          <button
                            onClick={() => dispatch(removeFromCart(course._id))}
                          >
                              <MdOutlineDeleteSweep />
                              <span>Remove</span>

                          </button>

                          <p>Rs { course?.price}</p>
                        </div>
                      

                  </div>;
              })
          }
    </div>
  )
}

export default RenderCartCourses