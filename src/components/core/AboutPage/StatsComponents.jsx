import React from 'react'

const StatsComponents = () => {

const Stats = [
  {
    count: "5K",
    label: "Active Student",
  },
  {
    count: "10K",
    label: "Mentors",
  },
  {
    count: "200+",
    label: "Courses",
  },
  {
    count: "50+",
    label: "Awards",
  },
];

  return (
    <section className="bg-richblack-700">
      <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto ">
        <div className=" w-[80%]  mx-auto grid grid-cols-2 md:grid-cols-4  ">
          {Stats.map((data, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 py-10 items-center justify-center"
            >
              <h1 className="text-white text-3xl font-bold">{data.count}</h1>
              <h2 className="text-richblack-300">{data.label}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsComponents