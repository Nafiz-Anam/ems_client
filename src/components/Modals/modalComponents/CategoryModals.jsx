import Toast from "../../../utils/toast";
import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import { Options } from "../../share/ui/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../../redux/features/modals/modalSlices";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "../../../redux/features/categories/categoriesApi";
import { useCreateSubCategoriesMutation, useUpdateSubCategoriesMutation } from "../../../redux/features/categories/subCategoriesApi";

export const AllCategory = ({ reload, type, setModalContent }) => {
  const dispatch = useDispatch()
  const { errorToast, successToast } = Toast()
  const [optionValue, setOptionValue] = useState()
  const [image, setState] = useState("")
  const { modal } = useSelector(state => state.modal)

  const [createCategory, { isLoading: createIsLoading }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: upIsLoading }] = useUpdateCategoryMutation()

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const categoryName = form.categoriesName.value
    const data = {
      id: modal?.selectedItem?.id,
      service_image: image,
      status: modal?.selectedItem?.status ? modal?.selectedItem?.status : optionValue,
      name: categoryName
    }
    if (!categoryName || !optionValue) {
      errorToast("please fill all the fields");
      return
    }
    type === "add" ? AddFn(data) : UpdateFn(data)
  }
  const AddFn = async (data) => {
    if (!data.service_image) return errorToast("please upload image")
    var formdata = new FormData();
    formdata.append("service_image", data.service_image);
    formdata.append("name", data.name);
    formdata.append("status", data.status === "active" ? 1 : 0);

    const resData = await createCategory(formdata)

    if (resData?.data?.status) {
      successToast("Add successfully")
      reload(modal?.page)
      dispatch(showModal({ show: false, title: null, width: null, selectedItem: null }))
      setModalContent('')
    } else { errorToast("something went wrong") }
  }
  const UpdateFn = async (data) => {
    var formdata = new FormData();
    data.service_image && formdata.append("service_image", data.service_image);
    formdata.append("name", data.name);
    formdata.append("status", data.status === "active" ? 1 : 0);
    formdata.append("category_id", data.id);

    const resData = await updateCategory(formdata)
    if (resData?.data?.status) {
      successToast("update  successfully")
      reload(modal?.page)
      dispatch(showModal({ show: false, title: null, width: null, selectedItem: null }))
      setModalContent(null)
    } else {
      errorToast("something went wrong")
    }
  }
  // for cancel button
  const cancelConfirm = () => {
    dispatch(showModal({ show: false, title: null, width: null, selectedItem: null }))
    setOptionValue(null)
    // errorToast("canceled")
  }
  useEffect(() => {
    setOptionValue(modal?.selectedItem?.status || null)
    if (!modal.show) {
      setState(""); setOptionValue(null)
    }
  }, [modal])

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-5 ">
        <p className='mt-6 mb-2 font-bold'>Bank Logo</p>
        <div className="w-[200px]">
          <ImageUploader image={image} setState={setState} />
        </div>
        <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2">
          <div className="">
            <div className="flex flex-col gap-2">
              <p className='capitalize'>Category Name</p>
              <input
                required
                name='categoriesName'
                value={modal.show ? modal.selectedItem?.name : ""}
                onChange={(e) => dispatch(showModal({ ...modal, selectedItem: { ...modal.selectedItem, name: e.target.value } }))}
                className='w-full p-2 border rounded-md' type="text" placeholder='categories Name' />
            </div>
          </div>
          <div className="">
            <p className="mb-2">Status</p>
            <Options
              options={["active", "inactive"]}
              optionValue={optionValue}
              setOptionValue={setOptionValue} />
          </div>
        </div>
      </div>
      {/* modal buttons */}
      <div className="flex items-center justify-start gap-3 p-4 mt-5 lg:gap-5">
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
          disabled={(createIsLoading || upIsLoading)}
          className={` flex items-center justify-center  gap-2 rounded-lg  px-4 py-2 font-poppins text-base font-normal text-white bg-[#0EAB8B] w-[130px]`}>
          {(createIsLoading || upIsLoading) ? <div className="flex flex-col items-center justify-center"> <span className=" loading loading-bars loading-md"></span></div> :
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
//! this is sub categories modal
export const SubCategoriesModal = ({ reload, type, setModalContent, }) => {

  const dispatch = useDispatch()
  const { errorToast, successToast } = Toast()
  const { modal } = useSelector(state => state.modal)
  const [image, setState] = useState("")
  const [optionValue, setOptionValue] = useState()
  const [categoryName, setCategoryName] = useState()
  //* service
  const { catagoriesData } = useSelector(state => state.catagories)
  const serviceNames = catagoriesData?.map(item => item.name);
  //* find category id
  const findCategoryId = catagoriesData?.find(item => item.name === categoryName)?.id

  const [createSubCategories, { isLoading: crIsLoading }] = useCreateSubCategoriesMutation()
  const [updateSubCategories, { isLoading: upIsLoading }] = useUpdateSubCategoriesMutation();

  useEffect(() => {
    setOptionValue(modal?.selectedItem?.status)
    setCategoryName(modal?.selectedItem?.category_name)
  }, [modal])

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const serviceName = form.serviceName.value
    const description = form.Description.value
    const data = {
      service_image: image,
      status: optionValue, name: serviceName, description, category_name: categoryName,
      sub_category_id: modal?.selectedItem?.id,
      category_id: findCategoryId
    }
    if (!optionValue || !categoryName) {
      errorToast("please fill all the fields")
      return
    }
    type === "add" ? AddFn(data) : UpdateFn(data)
  }
  // update modal function 
  const UpdateFn = async (data) => {
    var formdata = new FormData();
    data.service_image && formdata.append("service_image", data.service_image);
    formdata.append("name", data.name);
    formdata.append("status", data.status === "active" ? 0 : 1);
    formdata.append("description", data.description);
    formdata.append("sub_category_id", data.sub_category_id);
    formdata.append("category_id", data.category_id);

    const resData = await updateSubCategories(formdata)
    if (resData?.data?.status) {
      successToast("Update successfully"); reload(modal?.page); setModalContent(null)
      dispatch(showModal({ show: false, title: null, width: null, selectedItem: null }))
    } else { errorToast("something went wrong") }
  }
  // add  function for add categories
  const AddFn = async (data) => {
    if (!data.category_id) return errorToast("category it is not found ")
    var formdata = new FormData();
    formdata.append("service_image", data.service_image);
    formdata.append("name", data.name);
    formdata.append("status", data.status === "active" ? 1 : 0);
    formdata.append("category_id", data.category_id);
    formdata.append("description", data.description);

    const resData = await createSubCategories(formdata)
    if (resData?.data?.status) {
      successToast("Add successfully"); reload(modal?.page); setModalContent(null)
      dispatch(showModal({ show: false, title: null, width: null, selectedItem: null }))
    } else { errorToast("something went wrong") }
  }
  // for cancel button
  const cancelConfirm = () => {
    dispatch(showModal({ show: false, title: null, width: null, selectedItem: null }))
    // errorToast("canceled")
  }
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
              <p className='capitalize'>Service Name</p>
              <input
                required
                name='serviceName'
                onChange={(e) => dispatch(showModal({ ...modal, selectedItem: { ...modal.selectedItem, name: e.target.value } }))}
                value={modal.show ? modal.selectedItem?.name : ""}
                className='w-full p-2 border rounded-md' type="text" placeholder='Service Name' />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <p className='capitalize'>Description</p>
              <textarea
                required
                name='Description'
                value={modal.show ? modal.selectedItem?.description : ""}
                onChange={(e) => dispatch(showModal({ ...modal, selectedItem: { ...modal.selectedItem, description: e.target.value } }))}
                className='w-full h-20 p-2 border rounded-md' placeholder='Description ...' />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="">
              <div className="mb-2">Status</div>
              <Options
                options={["active", "inactive"]}
                optionValue={optionValue}
                setOptionValue={setOptionValue} />
            </div>
            <div className="">
              <div className="mb-2">Category</div>
              <Options
                options={serviceNames}
                optionValue={categoryName}
                setOptionValue={setCategoryName} />
            </div>
          </div>
        </div>
      </div>
      {/* modal buttons */}
      <div className="flex items-center justify-start gap-3 p-4 mt-2 lg:gap-5">
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
          disabled={(crIsLoading || upIsLoading)}
          className={` flex items-center justify-center  gap-2 rounded-lg  px-4 py-2 font-poppins text-base font-normal text-white bg-[#0EAB8B] w-[130px]`}>
          {(crIsLoading || upIsLoading) ? <div className="flex flex-col items-center justify-center"> <span className=" loading loading-bars loading-md"></span></div> :
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
