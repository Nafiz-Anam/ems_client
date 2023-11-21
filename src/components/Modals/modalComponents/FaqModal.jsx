import React, { useState } from 'react';
import { Options } from '../../share/ui/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../../redux/features/modals/modalSlices';
import Toast from '../../../utils/toast';
import { useAddFaqMutation } from '../../../redux/features/Setting/settingApi';

const FaqModal = ({ reload, type, setModalContent }) => {
  const { modal } = useSelector(state => state.modal)
  const dispatch = useDispatch()
  const { errorToast, successToast } = Toast()
  const [optionValue, setOptionValue] = useState()

  const [addFaq, { isLoading: addLoading }] = useAddFaqMutation()


  const loading = [addLoading]

  const cancelConfirm = () => {
    dispatch(showModal({ show: false, title: null, width: null, selectedItem: null }))
    setOptionValue(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const question = form.question.value
    const answer = form.answer.value

    const data = {
      question, answer, status: optionValue ? optionValue == "Active" ? 0 : 1 : null
    }
    type == "add" ? addFn(data) : updateFn(data)
    console.log("submit");
  }
  const addFn = async (data) => {
    if (!optionValue) return errorToast("Please select status")
    const resData = await addFaq(data)

    if (resData?.data?.status) {
      successToast("Add successfully")
      reload(modal?.page)
      dispatch(showModal({ show: false, title: null, width: null, selectedItem: null }))
      setModalContent('')
    } else { errorToast("something went wrong") }
  }
  const updateFn = () => {
    console.log("update");
  }


  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 m-5'>
      <div className="">
        <label htmlFor="add_faq">FAQ Question?</label>
        <input
          required
          id="add_faq"
          className="w-full p-2 border rounded-md focus:outline-none"
          type="text"
          name='question'
          placeholder='Enter Question' />
      </div>
      <div className="">
        <label htmlFor="add_faq">FAQ Answer?</label>
        <textarea
          required
          name='answer'
          id="add_faq"
          className="w-full h-40 textarea textarea-bordered focus:outline-none"
          placeholder="Answer"></textarea>
      </div>
      <div className="">
        <label htmlFor="add_faq">Status</label>
        <Options optionValue={optionValue}
          setOptionValue={setOptionValue}
          options={["Active", "Inactive"]} />
      </div>

      {/* modal buttons */}
      <div className="flex items-center justify-start gap-3 ">
        <span onClick={() => cancelConfirm()}
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
          disabled={loading.includes(true)}
          className={` flex items-center justify-center  gap-2 rounded-lg  px-4 py-2 font-poppins text-base font-normal text-white bg-[#0EAB8B] w-[130px]`}>
          {loading.includes(true) ? <div className="flex flex-col items-center justify-center"> <span className=" loading loading-bars loading-md"></span></div> :
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
            </svg>Confirm  </>}
        </button>
      </div>
    </form>
  );
};

export default FaqModal;