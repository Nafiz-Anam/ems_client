import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '../../Assets/locales/DashboardIcons';
import { DashboardCardData } from '../../Assets/data/data';

const ShowUsersCard = ({ link, title }) => {

  return (
    <div className="w-full mb-10 shadow-lg ">
      <div className='flex justify-between w-full gap-3 px-6 py-4 mt-4 shadow-md'>
        <div className="">
          {title}
        </div>
        <Link to={link} className="text-[#0EAB8B] font-semibold text-[14px] underline">View All</Link>
      </div>
      {DashboardCardData.map((item) => (
        <div className="px-6 py-4 border-b " key={item.id}>
          <div className="flex gap-3">
            <img src={item.image} alt="" className="w-[40px] h-[40px] rounded-full" />
            <div className="">
              <p>{item.name}</p>
              <div className="flex gap-1">
                <p className="text-[#0EAB8B]">{item.rating}</p>
                <StarIcon />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowUsersCard;