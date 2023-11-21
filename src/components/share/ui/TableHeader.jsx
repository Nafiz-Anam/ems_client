import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';


const TableHeader = ({ title }) => {
  return (
    <div className='flex flex-col w-full px-4 py-8 mx-auto bg-white md:px-8 ' >
      <h1 className='font-bold lg:text-2xl'>{title}</h1>
      <Breadcrumb />
    </div>
  );
};

export default TableHeader;