import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import TableHeader from '../../components/share/ui/TableHeader';
import Container from '../../components/share/ui/Container';
import TableTemp from '../../components/share/ui/TableTemp';
import { expertData } from '../../Assets/data/data';
import Search from '../../components/share/search/Search';
import { useSelector } from 'react-redux';
import { useGetExpertsMutation } from '../../redux/features/Expert/expertApi';
import StageLoading from '../../components/share/loading/StageLoading';
import Paginate from '../../components/share/Paginate/Paginate';

const Experts = () => {
  const location = useLocation()
  const { experts } = useSelector(state => state.expert)

  const [search, setSearch] = useState()
  const [rightPage, setRightPage] = useState(1)
  const [paginateData, setPaginateData] = useState([])

  const [getExperts, { isError, isLoading, isSuccess, error }] = useGetExpertsMutation()

  const loadDataFn = async (page) => {
    if (search?.expert) { setRightPage(1) }
    const data = await getExperts({ type: "expert", page, search: search?.expert })
    setPaginateData(data)
  }
  useEffect(() => { loadDataFn(rightPage) }, [search])

  const tableHead = [
    // ! emailVerified, phoneVerified, category, status -> missing in tableField
    { name: 'Image', field: 'profile_img', },
    { name: 'Username', field: 'full_name', },
    { name: 'Email ', field: 'email' },
    { name: 'phone ', field: 'mobile_no' },
    { name: 'Category ', field: 'category', }, //! missing
    { name: 'Join At', field: 'created_at', },
    { name: 'status', field: 'status', }
  ]
  const fieldsToShow = ['profile_img', 'full_name', 'email', "mobile_no", 'category', 'created_at', 'status']

  const handlePageClick = (data) => {
    let selected = data.selected;
    if (selected === 0) return loadDataFn(1);
    loadDataFn(selected + 1);
    setRightPage(selected + 1)
  };



  return (
    <div className=''>
      <TableHeader title={"Experts"} />
      <Container>
        <div className="md:flex mb-[37px] mt-[30px] items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="mb-2 text-xl font-bold">All Experts List</p>
          </div>
          <div className="flex flex-row items-end w-full md:max-w-md md:flex-col ">
            <div className="flex flex-col items-center w-full max-w-sm gap-2 md:flex-row ">
              <Search setSearch={setSearch} text={"username or email or phone"} name={"expert"} />
            </div>
          </div>
        </div>
        <div className="mb-8 overflow-x-scroll scrollbar-hide">
          <StageLoading
            error={error} isLoading={isLoading} isError={isError} isSuccess={isSuccess} data={experts}>
            <TableTemp
              // btn={true}
              linkUrl="/experts/all-expert/details"
              customID={true}
              assignLinkOnHeader="profile_img"
              linkOnly={true}
              linkFieldName="full_name"
              isImage={true}
              isImageLink={false}
              tableHead={tableHead}
              data={experts}
              fixedWith={180}
              // actionData={ActionData}
              fieldsToShow={fieldsToShow} />
          </StageLoading>
        </div>
      </Container>
      {!isError && <Paginate loadDataFn={handlePageClick} total={paginateData} />}
    </div>
  );
};

export default Experts;