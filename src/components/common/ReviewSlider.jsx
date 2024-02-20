import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  Navigation,
  Autoplay,
  FreeMode,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import ReactStars from "react-stars";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { ratingsEndpoints } from "../../services/apis";
import { apiConnector } from "../../services/apiconnector";
import RatingStars from "./RatingStars";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllReview = async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      console.log("rating review all data: ", data);

      if (data?.success) {
        setReviews(data?.data);
      }

      console.log("printing review all data: ", reviews);
    };

    fetchAllReview();
  }, []);

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full "
        >
          {reviews.map((review, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt="profile pic"
                      className="h-9 w-9 rounded-full object-cover"
                    />

                    <div>
                      <p>
                        {review?.user?.firstName}
                        {review?.user?.lastName}
                      </p>
                      <p>{review?.course?.courseName}</p>
                    </div>
                  </div>
                  <p>
                    {review?.review
                      .split(" ")
                      .splice(0, truncateWords)
                      .join(" ")}
                    ...
                  </p>
                  <div className="flex">
                    <p>{review?.rating}</p>
                    <ReactStars
                      count={5}
                      value={review?.rating}
                      size={20}
                      edit={false}
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
