import Toast from "../../utils/toast";
import { PlusIcon } from "../../Assets/icons";
import Modal from "../../components/Modals/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/share/search/Search";
import Container from "../../components/share/ui/Container";
import TableTemp from "../../components/share/ui/TableTemp";
import Paginate from "../../components/share/Paginate/Paginate";
import TableHeader from "../../components/share/ui/TableHeader";
import { showModal } from "../../redux/features/modals/modalSlices";
import StageLoading from "../../components/share/loading/StageLoading";
import { PrimaryButton } from "../../components/share/buttons/Buttons";
import DeleteCompo from "../../components/Modals/modalComponents/DeleteCompo";
import { AllCategory } from "../../components/Modals/modalComponents/CategoryModals";
import { useGetCategoriesMutation } from "../../redux/features/categories/categoriesApi";

const AllCategories = () => {
  const { errorToast } = Toast()
  const dispatch = useDispatch()

  const [search, setSearch] = useState()
  const [rightPage, setRightPage] = useState(1)
  const [paginateData, setPaginateData] = useState([])
  const [modalContent, setModalContent] = useState();

  const { catagoriesData } = useSelector(state => state.catagories)
  const [getCategories, { isLoading, isError, isSuccess, error }] = useGetCategoriesMutation()

  const loadDataFn = async (page) => {
    if (search?.category) { setRightPage(1) }

    const allData = await getCategories({ page, search: search?.category })
    setPaginateData(allData)
  }
  useEffect(() => { loadDataFn(rightPage) }, [search])

  // update modal function and api call
  const updateFn = (data) => {
    if (!data) { errorToast("data not found"); return }
    setModalContent(<AllCategory
      reload={loadDataFn} type="update" setModalContent={setModalContent} />)
    dispatch(showModal({ show: true, page: rightPage, title: "Update data", width: "max-w-2xl", selectedItem: { ...data }, }))
  }
  //call component for add categories
  const addFn = () => {
    if (isLoading) { errorToast("data is loading"); return }
    setModalContent(<AllCategory reload={loadDataFn} type="add" />)
    dispatch(showModal({ show: true, page: rightPage, title: "Add data", width: "max-w-2xl" }))
  }
  // delete  function 
  const deleteFn = (item) => {
    setModalContent(null)
    dispatch(showModal({ show: true, page: rightPage, title: "Delate", width: "max-w-lg", selectedItem: { ...item, name: item.name }, }))
    setModalContent(<DeleteCompo reloadFn={loadDataFn} name="category" />)
  };
  // table related 
  const tableHead = [
    { name: 'Image', field: 'service_image', },
    { name: 'Category Name', field: 'name', },
    { name: 'Created Date ', field: 'created_at', },
    { name: 'Status', field: 'status', },
  ];
  // table fields to show
  const fieldsToShow = ["service_image", "name", "created_at", "status"];
  // table action data
  const ActionData = [
    { name: "Edit", fn: updateFn },
    { name: "Delete", fn: deleteFn },
  ]
  // pagination function
  const handlePageClick = (data) => {
    let selected = data.selected;
    if (selected === 0) return loadDataFn(1);
    loadDataFn(selected + 1);
    setRightPage(selected + 1)
  }
  return (
    <div className=" bg-secondary" >
      <TableHeader title="Categories" />
      <Container className="flex flex-col">
        <div className="">
          <div className="md:flex mb-[37px] mt-[30px] items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="mb-2 text-xl font-bold">All Categories List</p>
            </div>
            <div className="flex flex-row items-center w-full gap-4 md:max-w-md md:flex-col ">
              <div className="flex flex-col items-center w-full gap-2 md:flex-row ">
                <Search setSearch={setSearch} text={"Category Name"} name={"category"} />
                <div className="w-full md:w-80">
                  <PrimaryButton
                    onClick={addFn}
                    className="flex items-center gap-2 rounded-md">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Category</PrimaryButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8 overflow-x-scroll scrollbar-hide">
            <StageLoading
              isError={isError} error={error} isLoading={isLoading} isSuccess={isSuccess} data={catagoriesData}>
              <TableTemp
                btn={true}
                linkUrl="/"
                customID={true}
                assignLinkOnHeader="service_image"
                isImage={true}
                isImageLink={false}
                tableHead={tableHead}
                data={catagoriesData}
                fieldsToShow={fieldsToShow}
                actionData={ActionData} />
            </StageLoading>
          </div>
        </div>
      </Container>
      <Modal modalContent={modalContent} />
      {!isError &&
        <Paginate rightPage={rightPage} loadDataFn={handlePageClick} total={paginateData} />}
    </div>
  );
};

export default AllCategories;

