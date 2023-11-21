import React from 'react';
import { Options } from '../share/ui/Dropdown';


const Info = () => {
  return (
    <div className='flex flex-col gap-y-7 mt-7'>
      <div className="flex items-center justify-between ">
        <p className='w-full'>
          <span className='text-xl font-bold'>ID #520</span>
          <br />
          <span className='text-gray-400'>Order Placed 11-07-2023 5:42 PM</span>
        </p>
        <div className="">
          <Options className="h-8 select-xl w-28" options={['Pending', "Completed", "Cancelled"]} />
        </div>
      </div>
      <div className="flex flex-col w-full gap-4 md:flex-row">
        <div className="flex justify-between md:w-1/2">
          <div className="w-full">
            <p>Order ID</p>
            <p>Payment Type </p>
            <p>Order Time</p>
          </div>
          <div className=" w-28">
            <p>520</p>
            <p>Bkash
              <p>6:00 PM</p>
            </p>
          </div>

        </div>
        <div className="flex justify-between md:w-1/2">
          <div className="w-full">
            <p>Order ID</p>
            <p>Payment Type </p>
            <p>Order Time</p>
          </div>
          <div className=" w-28">
            <p>Accepted</p>
            <p>Paid
              <p>2023-03-1</p>
            </p>
          </div>

        </div>
      </div>
      <div className="flex flex-col w-full gap-4 md:flex-row">
        <div className="p-4 rounded-xl md:w-1/2 bg-secondary">
          <p className='mb-2'>  Customer Information</p>
          <div className="flex justify-between">
            <div className="w-full">
              <p>Name</p>
              <p>Phone Number </p>
              <p>Address</p>
            </div>
            <div className="w-full text-right min-w-28">
              <p>Shakeeb</p>
              <p>0177990142 </p>
              <p>Lake side , Road-104, Gulshan 2,Dhaka </p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl md:w-1/2 bg-secondary">
          <p className='mb-2'>  Provider Information</p>
          <div className="flex justify-between">
            <div className="w-full">
              <p>Name</p>
              <p>Phone Number </p>
              <p>Address</p>
            </div>
            <div className="w-full text-right min-w-28">
              <p>Shakeeb</p>
              <p>0177990142 </p>
              <p>Lake side , Road-104, Gulshan 2,Dhaka </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 mb-5 rounded-xl bg-secondary">
        <p className='mb-2'>  House Cleaning Details</p>
        <div className="flex justify-between">
          <div className="w-full">
            <p>Category Name</p>
            <p>Sub Category</p>
            <p>Working Hour</p>
            <p>Price</p>
            <p>Vat</p>
            <p>Total Cost</p>
          </div>
          <div className="w-full text-right min-w-28">
            <p>Cleaning Service</p>
            <p>Floor Cleaning</p>
            <p>3 hours</p>
            <p>1500</p>
            <p>0%</p>
            <p>1500</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;