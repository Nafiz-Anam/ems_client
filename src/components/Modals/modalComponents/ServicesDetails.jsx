import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../../redux/features/modals/modalSlices';
import { useUpdateExpertsServicesMutation } from '../../../redux/features/Expert/expertApi';
import Toast from '../../../utils/toast';

const ServicesDetails = ({ reloadFn }) => {
  const [loading, setLoading] = useState('')
  const dispatch = useDispatch()
  const { errorToast, successToast } = Toast()
  const { modal } = useSelector(state => state.modal)
  const [updateExpertsServices, { isLoading }] = useUpdateExpertsServicesMutation()

  const servicesImagesArray = modal?.selectedItem?.service_img && JSON.parse(modal?.selectedItem?.service_img)

  const updateStatus = async (status) => {
    const data = { service_id: modal?.selectedItem?.id, req_status: status }
    const res = await updateExpertsServices(data)
    if (!res.data.status) return errorToast("something went wrong")
    await reloadFn()
    successToast('status updated')
    dispatch(showModal({ show: false, title: null, width: null, selectedItem: null }))

  }

  // console.log(modal?.selectedItem?.service_img);
  return (
    <div>
      <div className="">
        <div className="flex flex-col gap-4 mx-5 mt-3">
          <div className="flex justify-between">
            <div className="">
              <p className='mb-4'>Cover Image</p>
              <img className='w-[300px] h-auto object-cover' src={modal.selectedItem?.cover_img} alt="cover image" />
            </div>
            <div className="">
              <p className='mb-4'>Cover Video</p>
              <img className='w-[300px] h-auto object-cover' src={modal.selectedItem?.cover_img} alt="cover image" />
            </div>
          </div>
          <div className="w-full">
            <p className='mb-5'>Services Images</p>
            <div className="flex flex-wrap">
              {servicesImagesArray?.map((item, index) =>
                (<img key={index} className='max-w-[300px] w-full h-auto object-cover' src={modal.selectedItem?.cover_img} alt="cover image" />))}
            </div>
          </div>
          <div className="">
            <p className='mb-2'>Service Title</p>
            <input
              value={modal?.selectedItem?.title}
              disabled
              required
              name='first_name'
              type="text" className='w-full px-2 py-2 border rounded-md focus:outline-none' />
          </div>
          <div className="">
            <p className='mb-2'>Description</p>
            <textarea
              required
              disabled
              value={modal?.selectedItem?.description}
              name='address'
              type="text" className='flex justify-start w-full h-24 p-4 border rounded-md focus:outline-none' />
          </div>
          <div className="gap-4 mb-4 md:flex">
            <div className="w-full">
              <p className='mb-2'>Category</p>
              <input
                value={modal?.selectedItem?.category_name}
                disabled
                required
                name=''
                type="text" className='w-full px-2 py-2 border rounded-md focus:outline-none' />
            </div>
            <div className="w-full">
              <p className='mb-2'>Service Price</p>
              <input
                value={modal?.selectedItem?.budget}
                disabled
                required
                name='first_name'
                type="text" className='w-full px-2 py-2 border rounded-md focus:outline-none' />
            </div>
          </div>
        </div>
        {/* buttons */}
        {modal?.selectedItem?.req_status === "pending" &&
          <div className="flex items-center justify-start gap-3 p-4 lg:gap-5">
            <button
              onClick={() => {
                updateStatus(2)
                setLoading('reject')
              }}
              disabled={isLoading && loading === 'reject'}
              className={` flex items-center justify-center  gap-2 rounded-lg  px-4 py-2 font-poppins text-base font-normal text-white bg-[#EF4E57] w-[130px]`}>
              {isLoading && loading === 'reject' ? <div className="flex flex-col items-center justify-center">
                <span className=" loading loading-bars loading-md"></span></div> :
                <><svg
                  style={{ color: "#fff" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="cursor-pointer feather feather-x">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>  reject </>
              }
            </button>
            <button
              onClick={() => {
                updateStatus(0)
                setLoading('accept')
              }}
              disabled={isLoading && loading === 'accept'}
              className={` flex items-center justify-center  gap-2 rounded-lg  px-4 py-2 font-poppins text-base font-normal text-white bg-[#0EAB8B] w-[130px]`}>
              {isLoading && loading === 'accept' ? <div className="flex flex-col items-center justify-center"> <span className=" loading loading-bars loading-md"></span></div> :
                <> <svg
                  style={{ color: "#fff" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-check">
                  <polyline points="20 6 9 17 4 12" />
                </svg>accept
                </>
              }
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default ServicesDetails;