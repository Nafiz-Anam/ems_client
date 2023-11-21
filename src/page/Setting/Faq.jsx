import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modals/Modal';
import Paginate from '../../components/share/Paginate/Paginate';
import TableHeader from '../../components/share/ui/TableHeader';
import Container from '../../components/share/ui/Container';
import Search from '../../components/share/search/Search';
import TableTemp from '../../components/share/ui/TableTemp';
import { PrimaryButton } from '../../components/share/buttons/Buttons';
import { PlusIcon } from '../../Assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../redux/features/modals/modalSlices';
import FaqModal from '../../components/Modals/modalComponents/FaqModal';
import { useGetFaqMutation } from '../../redux/features/Setting/settingApi';
import StageLoading from '../../components/share/loading/StageLoading';

const Faq = () => {
  const [search, setSearch] = useState()
  const [modalContent, setModalContent] = useState();
  const [rightPage, setRightPage] = useState(1)
  const [paginateData, setPaginateData] = useState([])

  const dispatch = useDispatch()
  const { faq } = useSelector(state => state.settings)
  const [getFaq, { isError, isSuccess, isLoading, error }] = useGetFaqMutation()

  const loadDataFn = async (page) => {
    if (search?.faq) { setRightPage(1) }
    const allData = await getFaq({ page, search: search?.faq })
    setPaginateData(allData)
  }
  useEffect(() => { loadDataFn(rightPage) }, [search])

  const addFn = () => {
    setModalContent(null)
    dispatch(showModal({ show: true, page: rightPage, title: "Add Faq", width: "max-w-xl", selectedItem: null }))
    setModalContent(<FaqModal reload={loadDataFn} name="Faq" type={"add"} />)
  }
  const updateFn = (data) => { }
  const deleteFn = (item) => { }

  const tableHead = [
    { name: 'Question', field: 'question', },
    { name: 'Answer', field: 'answer', },
    { name: 'Created Date ', field: 'created_at', },
    { name: 'Status', field: 'status', },
  ]
  const fieldsToShow = ['question', 'answer', 'created_at', 'status']
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
      <TableHeader title="Faq" />
      <Container className="flex flex-col">
        <div className="">
          <div className="md:flex mb-[37px] mt-[30px] items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="mb-2 text-xl font-bold">All Faq List</p>
            </div>
            <div className="flex flex-row items-center w-full gap-4 md:max-w-md md:flex-col ">
              <div className="flex flex-col items-center w-full gap-2 md:flex-row ">
                <Search setSearch={setSearch} text={"Title"} name={"faq"} />
                <div className="w-full md:w-48">
                  <PrimaryButton
                    onClick={addFn}
                    className="flex items-center gap-2 rounded-md">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Faq
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8 overflow-x-scroll scrollbar-hide">
            <StageLoading
              isError={isError} error={error} isLoading={isLoading} isSuccess={isSuccess} >
              <TableTemp
                btn={true}
                linkUrl="/"
                customID={true}
                assignLinkOnHeader="service_image"
                isImage={false}
                isImageLink={false}
                tableHead={tableHead}
                data={faq}
                fixedWith={true}
                fieldsToShow={fieldsToShow}
                actionData={ActionData}
              />
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

export default Faq;