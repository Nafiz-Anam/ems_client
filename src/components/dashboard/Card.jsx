import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ data, className, iconSize }) => {
  return (
    <div
      className={twMerge("flex items-center justify-between w-full pl-4 pr-1 pt-2  duration-300  rounded-xl cursor-pointer  shadow-cardShadow   ", className)}>

      <div className="flex flex-col justify-center w-full h-full gap-2">
        <h1 className="w-20 font-semibold font-inter group-hover:text-white md:text-2xl ">{data?.value} </h1>
        <p className="text-sm font-medium font-poppins group-hover:text-white">
          {data?.name} </p>
      </div>
      <span className={twMerge("group-hover:text-white ", iconSize)}>
        {data?.icon}
      </span>

    </div>
  );
};

export default Card;