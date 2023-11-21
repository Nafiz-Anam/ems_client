import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Search from '../../components/share/search/Search';
import TableTemp from '../../components/share/ui/TableTemp';
import Container from '../../components/share/ui/Container';
import Paginate from '../../components/share/Paginate/Paginate';
import TableHeader from '../../components/share/ui/TableHeader';
import StageLoading from '../../components/share/loading/StageLoading';
import { useGetExpertsServicesMutation } from '../../redux/features/Expert/expertApi';
import { showModal } from '../../redux/features/modals/modalSlices';
import Modal from '../../components/Modals/Modal';
import ServicesDetails from '../../components/Modals/modalComponents/ServicesDetails';

const ExpertServicesRequest = () => {
  const [modalContent, setModalContent] = useState();
  const { id } = useParams()
  const dispatch = useDispatch()
  const [paginateData, setPaginateData] = useState([])

  const { expertsServices } = useSelector(state => state.expert)
  const [getExpertsServices, { isLoading, isSuccess, isError }] = useGetExpertsServicesMutation()

  const loadDataFn = async (page) => {
    const data = await getExpertsServices({
      posted_by: id ? decodeURIComponent(id) : null,
      req_status: id ? null : 1,
      page
    })
    setPaginateData(data)
  }
  useEffect(() => { loadDataFn() }, [id])

  const handlePageClick = (data) => {
    let selected = data.selected;
    if (selected === 0) return loadDataFn(1);
    loadDataFn(selected + 1);
  };

  const ExpertRequestSee = (item) => {
    dispatch(showModal({ show: true, title: "Services Details", width: "max-w-2xl", selectedItem: { ...item, name: item.methodName }, }))
    setModalContent(<ServicesDetails reloadFn={loadDataFn} />)
  }
  const tableHead = [
    { name: 'ID', field: 'id', },
    { name: 'Expert Name', field: 'expert_name', },
    { name: 'Image', field: 'cover_img', },
    { name: 'Service Title ', field: 'title' },
    { name: 'Category ', field: 'category_name', },
    { name: 'Description', field: 'description', },
    { name: 'status', field: 'req_status', },
  ]

  const fieldsToShow = ['id', 'cover_img', 'full_name', 'title', "category_name", "description", 'category_name', 'req_status']

  const ActionData = [
    { name: "Details", fn: ExpertRequestSee },
  ]

  return (
    <div className=''>
      <TableHeader title={"Experts request"} />
      <Container>
        <div className="md:flex mb-[37px] mt-[30px] items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="mb-2 text-xl font-bold">Request Expert services list</p>
          </div>
          <div className="flex flex-row items-end w-full md:max-w-md md:flex-col ">
            <div className="flex flex-col items-center w-full max-w-sm gap-2 md:flex-row ">
              <Search />
            </div>
          </div>
        </div>
        <div className="mb-8 overflow-x-scroll scrollbar-hide">
          <StageLoading isError={isError} isLoading={isLoading} isSuccess={isSuccess} data={expertsServices}>
            <TableTemp
              btn={true}
              isImage={true}
              assignLinkOnHeader="cover_img"
              linkOnly={false}
              fixedWith={"max-w-[200px]"}
              document={false}
              isImageLink={false}
              tableHead={tableHead}
              data={expertsServices}
              actionData={ActionData}
              fieldsToShow={fieldsToShow}
              // linkFieldName="full_name"
              userID={true}
              idFieldName="id"
            />
          </StageLoading>
        </div>
      </Container>
      {!isError && <Paginate loadDataFn={handlePageClick} total={paginateData} />}
      <Modal modalContent={modalContent} />
    </div>
  );
};

export default ExpertServicesRequest;