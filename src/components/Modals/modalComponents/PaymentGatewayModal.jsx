import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showModal } from '../../../redux/features/modals/modalSlices';
import Toast from '../../../utils/toast';
import ImageUploader from './ImageUploader';
import { SharedDropdown } from '../../share/ui/Dropdown';


export const CardModal = ({ onConfirm }) => {

  const { errorToast } = Toast()
  const dispatch = useDispatch()
  const { modal } = useSelector(state => state.modal)

  // console.log(modal);
  // for status dropdown
  const [status, setStatus] = useState({})
  // for image uploader
  const [image, setState] = useState("")
  // form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const categoryName = form.categoriesName.value
    const data = { image, status, categoryName }
    if (!categoryName || !status || !image) {
      errorToast("please fill all the fields")
      return
    }
    onConfirm(data)
    form.reset()
  }
  // for cancel button
  const cancelConfirm = () => {
    dispatch(showModal({ show: false, title: null, width: null, selectedItem: null }))
    // errorToast("canceled")
  }

  useEffect(() => {
    if (!modal.show) {
      setState("")
      setStatus({})
    }
  }, [modal])

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-5 ">
        <p className='mt-6 mb-2 font-bold'>Bank Logo</p>
        <div className="w-[200px]">
          <ImageUploader image={image} setState={setState} />
        </div>
        <div className="">
          <div className="">
            <div className="flex flex-col gap-2">
              <p className='capitalize'>Method Name</p>
              <input
                required
                name='categoriesName'
                defaultValue={modal.show && modal.selectedItem?.methodName}
                className='w-full p-2 border rounded-md' type="text" placeholder='categories Name' />
            </div>
          </div>
          <div className="">
            <SharedDropdown
              setDropdownValues={setStatus}
              label={"status"}
              options={["active", "deActive"]}
              value={modal.show ? modal?.selectedItem?.status : ""}
            />
          </div>
        </div>
      </div>
      {/* modal buttons */}
      <div className="flex items-center justify-start gap-3 p-4 mt-5 lg:gap-5">
        <span
          onClick={() => cancelConfirm()}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#EF4E57] px-4 py-2 font-poppins text-base font-normal text-white cursor-pointer">
          <svg
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
          </svg>
          Cancel
        </span>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#0EAB8B] px-4 py-2 font-poppins text-base font-normal text-white">
          <svg
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
          </svg>{" "}
          Confirm
        </button>
      </div>
    </form>
  );
};

export const BankingModal = ({ onConfirm }) => {

  const { errorToast } = Toast()
  const dispatch = useDispatch()
  const { modal } = useSelector(state => state.modal)

  // console.log(modal);
  // for status dropdown
  const [status, setStatus] = useState({})
  // for image uploader
  const [image, setState] = useState("")
  // form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const categoryName = form.categoriesName.value
    const data = { image, status, categoryName }
    if (!categoryName || !status || !image) {
      errorToast("please fill all the fields")
      return
    }
    onConfirm(data)
    form.reset()
  }
  // for cancel button
  const cancelConfirm = () => {
    dispatch(showModal({ show: false, title: null, width: null, selectedItem: null }))
    // errorToast("canceled")
  }

  useEffect(() => {
    if (!modal.show) {
      setState("")
      setStatus({})
    }
  }, [modal])

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-5 ">
        <p className='mt-6 mb-2 font-bold'>Bank Logo</p>
        <div className="w-[200px]">
          <ImageUploader image={image} setState={setState} />
        </div>
        <div className="">
          <div className="">
            <div className="flex flex-col gap-2">
              <p className='capitalize'>Method Name</p>
              <input
                required
                name='categoriesName'
                defaultValue={modal.show ? modal.selectedItem?.methodName : ""}
                className='w-full p-2 border rounded-md' type="text" placeholder='categories Name' />
            </div>
          </div>
          <div className="">
            <SharedDropdown
              setDropdownValues={setStatus}
              label={"status"}
              options={["active", "deActive"]}
              value={modal.show ? modal?.selectedItem?.status : ""}
            />
          </div>
        </div>
      </div>
      {/* modal buttons */}
      <div className="flex items-center justify-start gap-3 p-4 mt-5 lg:gap-5">
        <span
          onClick={() => cancelConfirm()}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#EF4E57] px-4 py-2 font-poppins text-base font-normal text-white cursor-pointer">
          <svg
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
          </svg>
          Cancel
        </span>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#0EAB8B] px-4 py-2 font-poppins text-base font-normal text-white">
          <svg
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
          </svg>{" "}
          Confirm
        </button>
      </div>
    </form>
  );
};
