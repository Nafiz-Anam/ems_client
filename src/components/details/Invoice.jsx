import React from 'react';
import { useDispatch } from 'react-redux';
import Print from '../share/Print/Print';
import TableTemp from '../share/ui/TableTemp';
import { PrimaryButton } from '../share/buttons/Buttons';
import { setPrintStart } from '../../redux/features/utils/utilsSlice';

const Invoice = () => {
  const dispatch = useDispatch()
  const data = [
    { name: "Booking Date", value: "12/12/2021" },
    { name: "Booking ID", value: "0000000000" },
    { name: "Customer Name", value: "Shakeeb" },
    { name: "Customer Phone", value: "0177990142" },
    { name: "Customer Address", value: "Lake side , Road-104, Gulshan 2,Dhaka" },
    { name: "Service Name", value: "Plumbing" },
    { name: "Expert Phone Number", value: "0177990142" },
    { name: "Total Amount", value: "2000" },
    { name: "Payment Type", value: "Cash" },
    { name: "Payment Status", value: "Paid" },
  ]

  const tableHead = [
    { id: 1, name: 'Service Name', field: 'name', },
    { id: 2, name: 'Sub Category Name', field: 'Sub_Category_Name', },
    { id: 3, name: 'Working Hour', field: 'Working_Hour', },
    { id: 4, name: 'Price ', field: 'Price', },
    { id: 5, name: 'Vat', field: 'Vat', },
    { id: 5, name: 'Total Cost', field: 'Total_Cost', },
  ];
  const tableBody = [
    { id: 1, name: "plumbing", Sub_Category_Name: "Floor Cleaning", Working_Hour: "3 hours", Price: "2000", Vat: "200", Total_Cost: "2200" },



  ]
  const fieldsToShow = [
    "name",
    "Sub_Category_Name",
    "Working_Hour",
    "Price",
    "Vat",
    "Total_Cost",
  ]; // Customize this array as per your preference



  return (
    <div className='flex flex-col text-gray-600 my-7'>
      <Print >
        <h1 className='mb-4 font-bold text-md'>Booking Details Invoice</h1>
        <div className="border ">
          {data.map((item, i) => (
            <div className='flex justify-between p-2 border-b' key={i} >
              <p>{item.name}</p>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
        <div className="my-4">
          <p>Service Details</p>
          <div className="mt-4">
            <TableTemp
              tableHead={tableHead}
              data={tableBody}
              fieldsToShow={fieldsToShow} />
          </div>
        </div>
      </Print>
      <div className="flex justify-center">
        <PrimaryButton
          onClick={() => dispatch(setPrintStart(true))}
          className="flex justify-center gap-3 rounded-md w-28">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path d="M7 5.5C7 3.84 8.34 2.5 10 2.5H14C15.66 2.5 17 3.84 17 5.5C17 6.05 16.55 6.5 16 6.5H8C7.45 6.5 7 6.05 7 5.5Z" fill="white" />
            <path d="M17.75 15.5C17.75 15.91 17.41 16.25 17 16.25H16V19.5C16 21.16 14.66 22.5 13 22.5H11C9.34 22.5 8 21.16 8 19.5V16.25H7C6.59 16.25 6.25 15.91 6.25 15.5C6.25 15.09 6.59 14.75 7 14.75H17C17.41 14.75 17.75 15.09 17.75 15.5Z" fill="white" />
            <path d="M18 7.5H6C4 7.5 3 8.5 3 10.5V15.5C3 17.5 4 18.5 6 18.5H6.375C6.72018 18.5 7 18.2202 7 17.875C7 17.5298 6.71131 17.2604 6.38841 17.1384C5.72619 16.8882 5.25 16.2453 5.25 15.5C5.25 14.54 6.04 13.75 7 13.75H17C17.96 13.75 18.75 14.54 18.75 15.5C18.75 16.2453 18.2738 16.8882 17.6116 17.1384C17.2887 17.2604 17 17.5298 17 17.875C17 18.2202 17.2798 18.5 17.625 18.5H18C20 18.5 21 17.5 21 15.5V10.5C21 8.5 20 7.5 18 7.5ZM10 12.25H7C6.59 12.25 6.25 11.91 6.25 11.5C6.25 11.09 6.59 10.75 7 10.75H10C10.41 10.75 10.75 11.09 10.75 11.5C10.75 11.91 10.41 12.25 10 12.25Z" fill="white" />
          </svg>
          Print</PrimaryButton>
      </div>
    </div>
  );
};

export default Invoice;