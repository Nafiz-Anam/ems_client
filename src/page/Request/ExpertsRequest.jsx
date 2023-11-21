import React, { useEffect, useState } from 'react';
import TableHeader from '../../components/share/ui/TableHeader';
import Container from '../../components/share/ui/Container';
import Search from '../../components/share/search/Search';
import TableTemp from '../../components/share/ui/TableTemp';
import { expertData } from '../../Assets/data/data';
import { useGetExpertsRequestMutation } from '../../redux/features/Expert/expertApi';
import { useSelector } from 'react-redux';
import { SkeletonLoader } from '../../components/share/loading/SkeletonLoader';
import Toast from '../../utils/toast';
import { useNavigate } from 'react-router-dom';
import StageLoading from '../../components/share/loading/StageLoading';
import Paginate from '../../components/share/Paginate/Paginate';

const ExpertsRequest = () => {
  const { errorToast, successToast } = Toast()
  const navigate = useNavigate()
  const { expertRequests } = useSelector(state => state.expert)
  const [getExpertsRequest, { isLoading, isSuccess, isError }] = useGetExpertsRequestMutation()

  const [search, setSearch] = useState()
  const [rightPage, setRightPage] = useState(1)
  const [paginateData, setPaginateData] = useState([])

  const loadDataFn = async (page) => {
    if (search?.expert_request) { setRightPage(1) }
    const allData = await getExpertsRequest({ page, search: search?.expert_request })
    setPaginateData(allData)
  }
  useEffect(() => { loadDataFn(rightPage) }, [search])

  const tableHead = [
    { name: 'Image', field: 'profile_img', },
    { name: 'Username', field: 'full_name', },
    { name: 'Email ', field: 'email' },
    { name: 'phone ', field: 'mobile_no' },
    { name: 'Category ', field: 'category_name', },
    { name: 'Join At', field: 'created_at', },
    { name: 'status', field: 'expert_request', },
  ]
  const fieldsToShow = ['profile_img', 'full_name', 'contact.email', "mobile_no", "contact.phone", 'category_name', 'created_at', 'expert_request']

  const handleDeleteModal = () => { }
  const redirectPage = (data) => {
    // console.log(data);
    if (!data) { return errorToast("selected data not found") }
    const id = encodeURIComponent(data?.id)
    navigate(`/expert-request/${id}`)
  }

  const ActionData = [
    { name: "Details", fn: redirectPage },
    { name: "Delete", fn: handleDeleteModal },
  ]
  const handlePageClick = (data) => {
    let selected = data.selected;
    if (selected === 0) return loadDataFn(1);
    loadDataFn(selected + 1);
    setRightPage(selected + 1)
  }
  return (
    <div className=''>
      <TableHeader title={"Experts request"} />
      <Container>
        <div className="md:flex mb-[37px] mt-[30px] items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="mb-2 text-xl font-bold">Request Expert list</p>
          </div>
          <div className="flex flex-row items-end w-full md:max-w-md md:flex-col ">
            <div className="flex flex-col items-center w-full max-w-sm gap-2 md:flex-row ">
              <Search setSearch={setSearch} text={"name/phone/category"} name={"expert_request"} />
            </div>
          </div>
        </div>
        <div className="mb-8 overflow-x-scroll scrollbar-hide">
          <StageLoading isError={isError} isLoading={isLoading} isSuccess={isSuccess} data={expertRequests}>
            <TableTemp
              btn={true}
              isImage={true}
              customID={true}
              linkOnly={false}
              fixedWith={180}
              document={false}
              isImageLink={false}
              tableHead={tableHead}
              data={expertRequests}
              actionData={ActionData}
              fieldsToShow={fieldsToShow}
              // linkFieldName="full_name"
              linkUrl="/experts/all-expert/details"
              customIdFieldName="id"
              assignLinkOnHeader="profile_img"
            // documentFieldName=""
            />
          </StageLoading>
        </div>
      </Container>
      {!isError &&
        <Paginate rightPage={rightPage} loadDataFn={handlePageClick} total={paginateData} />}
    </div>
  );
};

export default ExpertsRequest;