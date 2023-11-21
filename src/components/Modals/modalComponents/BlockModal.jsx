import React, { Fragment } from "react";
import Toast from "../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../../redux/features/modals/modalSlices";
import { useUpdateStatusMutation } from "../../../redux/features/users/usersApi";


const BlockModal = ({ reloadFn }) => {
  const { errorToast } = Toast()
  const dispatch = useDispatch()
  const { modal } = useSelector(state => state.modal)
  const [updateStatus, { isLoading }] = useUpdateStatusMutation()

  const blockUser = async (id) => {
    const data = await updateStatus({ id, status: 1 })
    return data?.data?.status
  }
  const unblockUser = async (id) => {
    const data = await updateStatus({ id, status: 0 })
    return data?.data?.status
  }

  const confirmBlockUnblock = async () => {
    const id = modal?.selectedItem?.id
    if (!id) return errorToast("it is not a valid id")
    const result = modal?.title === "block" ? await blockUser(id) : await unblockUser(id)
    if (!result) return errorToast("something went wrong please try again")
    dispatch(showModal({ show: false, title: null, width: null, selectedItem: null }))
    reloadFn()
  };
  const cancelConfirm = () => {
    dispatch(showModal({ show: false, title: null, width: null, selectedItem: null }))
    errorToast("block canceled")
  }
  return (
    <>
      <h1 className="px-4 my-3 text-xl font-bold">  Are you sure you wanted to  {modal?.title} ? </h1>
      <div className="bg-orange-200 ">
        <p className="px-4 text-red-700 ">
          Block person name : <span className="font-bold text-red-600 text-md"> {modal.selectedItem?.name} {" "}
          </span> </p>
      </div>
      <div className="flex items-center justify-end gap-3 p-4 mt-5 lg:gap-5">
        <button
          onClick={() => cancelConfirm()}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#F56E6E] px-4 py-2 font-poppins text-base font-normal text-white">
          <svg style={{ color: "#fff" }} xmlns="http://www.w3.org/2000/svg" width="20"
            height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg> Cancel
        </button>
        <button
          onClick={() => confirmBlockUnblock()}
          disabled={isLoading}
          className={` flex items-center justify-center  gap-2 rounded-lg  px-4 py-2 font-poppins text-base font-normal text-white bg-[#0EAB8B] w-[130px]`}>
          {isLoading ? <div className="flex flex-col items-center justify-center"> <span className=" loading loading-bars loading-md"></span></div> :
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
    </>
  );
};

export default BlockModal;
