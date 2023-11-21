import React from 'react';
import Search from '../search/Search';

const TableSearch = ({ title }) => {
  return (
    <>
      <div className="flex mb-[37px] mt-[30px] items-center justify-between">
        <div className="">
          <p className='text-xl font-bold'>{title}</p>
          <p className='flex gap-2 mt-2'>
            <span>Show</span>
            <select className="text-xs rounded-none select select-xs">
              <option selected>10</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
              <option>50</option>
            </select>
            <span>entries</span>
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-4 md:w-[unset] md:flex-row ">
          <div className="flex items-center w-full ">
            <Search />
          </div>
        </div>
      </div>
    </>
  );
};

export default TableSearch;