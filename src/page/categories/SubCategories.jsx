import Toast from '../../utils/toast';
import { PlusIcon } from '../../Assets/icons';
import Modal from '../../components/Modals/Modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/share/search/Search';
import Container from '../../components/share/ui/Container';
import TableTemp from '../../components/share/ui/TableTemp';
import TableHeader from '../../components/share/ui/TableHeader';
import Paginate from '../../components/share/Paginate/Paginate';
import { showModal } from '../../redux/features/modals/modalSlices';
import { PrimaryButton } from '../../components/share/buttons/Buttons';
import StageLoading from '../../components/share/loading/StageLoading';
import DeleteCompo from '../../components/Modals/modalComponents/DeleteCompo';
import { useGetCategoriesMutation } from '../../redux/features/categories/categoriesApi';
import { SubCategoriesModal } from '../../components/Modals/modalComponents/CategoryModals';
import { useGetSubCategoriesMutation } from '../../redux/features/categories/subCategoriesApi';

const SubCategories = () => {

  const dispatch = useDispatch()
  const { errorToast } = Toast()
  const [modalContent, setModalContent] = useState();
  const { catagoriesData, subCatagoriesData } = useSelector(state => state.catagories)

  const [search, setSearch] = useState()
  const [rightPage, setRightPage] = useState(1)
  const [paginateData, setPaginateData] = useState([])

  // get categories and sub categories data
  const [getCategories, { error }] = useGetCategoriesMutation()
  const [getSubCategories, { isSuccess, isLoading, isError }] = useGetSubCategoriesMutation();
  // load data function
  const loadDataFn = async (page) => {
    if (search?.sub_category) { setRightPage(1) }
    const data = await getSubCategories({ page, search: search?.sub_category })
    setPaginateData(data)
    getCategories()
  }
  useEffect(() => { loadDataFn(rightPage) }, [search])

  //call component for add categories
  const AddFn = () => {
    if (isLoading) { errorToast('data is loading'); return }
    if (isError) { errorToast("categories data is not found"); return }
    if (catagoriesData?.length < 1) { errorToast("Please add categories first"); return }
    dispatch(showModal({ show: true, page: rightPage, title: "Add sub Categories", width: "max-w-2xl", selectedItem: null }))
    setModalContent(<SubCategoriesModal reload={loadDataFn} type="add" setModalContent={setModalContent} />)
  }
  // update modal function
  const UpdateFn = (data) => {
    if (isError) { errorToast("categories data is not found"); return }
    setModalContent(<SubCategoriesModal reload={loadDataFn} type="update" setModalContent={setModalContent} />)
    dispatch(showModal({ show: true, page: rightPage, title: "Update data", width: "max-w-2xl", selectedItem: { ...data, name: data.name }, }))
  }
  // delete  function
  const DeleteFn = (item) => {
    setModalContent(null)
    setModalContent(<DeleteCompo reloadFn={loadDataFn} name="subCatagories" />)
    dispatch(showModal({ show: true, page: rightPage, title: "Delate", width: "max-w-lg", selectedItem: { ...item, name: item.name }, }))
  };
  //table related 
  const tableHead = [
    { name: 'Image', field: 'image', },
    { name: 'Service Name', field: 'name', },
    { name: 'Category Name', field: 'category_name' },
    { name: 'Description ', field: 'description', },
    { name: 'Status', field: 'status', },
  ];
  // table fields to show
  const fieldsToShow = ["image", "name", "category_name", "description", "status"];
  // table action data
  const ActionData = [
    { name: "Edit", fn: UpdateFn },
    { name: "Delete", fn: DeleteFn },
  ]
  // pagination function
  const handlePageClick = (data) => {
    let selected = data.selected;
    if (selected === 0) return loadDataFn(1);
    loadDataFn(selected + 1);
    setRightPage(selected + 1)
  }
  return (
    <div>
      <div className="bg-secondary" >
        <div className="">
          <TableHeader title="Categories" />
        </div>
        <Container className="flex flex-col ">
          <div className="">
            <div className="md:flex mb-[37px] mt-[30px] items-center justify-between">
              <div className="mb-4 md:mb-0">
                <p className="mb-2 text-xl font-bold">All Sub Categories List</p>
              </div>
              <div className="flex flex-row items-center w-full gap-4 md:max-w-md md:flex-col ">
                <div className="flex flex-col items-center w-full gap-2 md:flex-row ">
                  <Search setSearch={setSearch} text="Sub Categories" name={"sub_category"} />
                  <div
                    onClick={AddFn}
                    className="w-full ">
                    <PrimaryButton
                      className="flex items-center w-full gap-2 rounded-md">
                      <PlusIcon className="w-5 h-5 mr-2" />
                      Add subCategory</PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-8 overflow-x-scroll scrollbar-hide">
              <StageLoading
                isError={isError} isLoading={isLoading} isSuccess={isSuccess} data={subCatagoriesData} error={error}>
                <TableTemp
                  btn={true}
                  linkUrl="/"
                  customID={true}
                  assignLinkOnHeader="image"
                  isImage={true}
                  isImageLink={false}
                  tableHead={tableHead}
                  data={subCatagoriesData}
                  fieldsToShow={fieldsToShow}
                  actionData={ActionData} />
              </StageLoading>
            </div>
          </div>
        </Container>
        {!isError && subCatagoriesData?.length > 0 && <Paginate loadDataFn={handlePageClick} total={paginateData} />}
      </div>
      <Modal modalContent={modalContent} />
    </div>
  );
};

export default SubCategories;