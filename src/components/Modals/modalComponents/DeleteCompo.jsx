import React from "react";
import Toast from "../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../../redux/features/modals/modalSlices";
import { useDelateCategoriesMutation } from "../../../redux/features/categories/categoriesApi";
import { useDelateSubCategoriesMutation } from "../../../redux/features/categories/subCategoriesApi";
import { useDelateJobPostMutation } from "../../../redux/features/jobPosts/jobPostApi";


const DeleteCompo = ({ reloadFn, name }) => {
  const { errorToast, successToast } = Toast()
  const dispatch = useDispatch()
  const { modal } = useSelector(state => state.modal)
  const [delateJobPost, { isLoading: postLoading }] = useDelateJobPostMutation()
  const [delateCategories, { isLoading: catLoading }] = useDelateCategoriesMutation()
  const [delateSubCategories, { isLoading: subIsLoading }] = useDelateSubCategoriesMutation()

  const loading = [subIsLoading, catLoading, postLoading]
  const confirmDelete = async () => {
    let result;
    if (name === "category") result = await delateCategories(modal.selectedItem.id)
    if (name === "subCatagories") result = await delateSubCategories(modal.selectedItem.id)
    if (name === "jobPost") result = await delateJobPost(modal.selectedItem.id)
    if (!result?.data?.status) return errorToast("Something went wrong")
    dispatch(showModal({ show: false, page: null, title: null, width: null, selectedItem: null }))
    successToast("Delete successfully")
    reloadFn(modal.page)
  };
  const cancelConfirm = () => {
    dispatch(showModal({ show: false, page: null, title: null, width: null, selectedItem: null }))
    errorToast("Delete canceled")
  }
  return (
    <>
      <h1 className="px-4 my-3 text-xl font-bold">
        Are you sure you wanted to  delate ?
      </h1>
      <div className="bg-orange-200 ">
        <p className="px-4 text-red-700 ">
          This action cannot be undone and will permanently delete the <span className="font-bold text-red-600 text-md">
            : {modal.selectedItem?.name} {" "}
          </span>
          <br />
        </p>
      </div>
      <div className="flex items-center justify-end gap-3 p-4 mt-5 lg:gap-5">
        <button
          onClick={() => cancelConfirm()}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#F56E6E] px-4 py-2 font-poppins text-base font-normal text-white">
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
        </button>
        <button
          onClick={() => confirmDelete()}
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
    </>
  );
};

export default DeleteCompo;
