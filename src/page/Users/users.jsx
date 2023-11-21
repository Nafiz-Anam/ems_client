import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Search from '../../components/share/search/Search';
import TableTemp from '../../components/share/ui/TableTemp';
import Container from '../../components/share/ui/Container';
import TableHeader from '../../components/share/ui/TableHeader';
import Paginate from '../../components/share/Paginate/Paginate';
import StageLoading from '../../components/share/loading/StageLoading';
import { useGetUsersMutation } from '../../redux/features/users/usersApi';

const Users = () => {
  const [search, setSearch] = useState()
  const [rightPage, setRightPage] = useState(1)
  const [paginateData, setPaginateData] = useState([])

  const { data } = useSelector(state => state.users)
  const [getUsers, { isError, isLoading, isSuccess, error }] = useGetUsersMutation()

  const loadDataFn = async (page) => {
    if (search?.client) { setRightPage(1) }
    const data = await getUsers({ type: "client", page, search: search?.client })
    setPaginateData(data)
  }
  useEffect(() => { loadDataFn(rightPage) }, [search])

  const handlePageClick = (data) => {
    let selected = data.selected;
    if (selected === 0) return loadDataFn(1);
    loadDataFn(selected + 1);
    setRightPage(selected + 1)
  };

  const tableHead = [
    // ! emailVerified, phoneVerified, status , accountBalance -> missing in tableField
    { name: 'Image', field: 'id_img1', },
    { name: 'Username', field: 'full_name', },
    { name: 'Email - Phone ', field: 'mobile_no', },
    { name: 'Gender ', field: 'gender', },
    { name: 'Account balance', field: 'account_balance', },
    { name: 'Join', field: 'created_at', },
    { name: 'status', field: 'status', },
  ];
  const fieldsToShow = ["id_img1", "full_name", "mobile_no", "gender", "account_balance", "created_at", "status"]

  return (
    <div className='bg-secondary'>
      <TableHeader title={"All Users"} />
      <Container>
        <div className="md:flex mb-[37px] mt-[30px] items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="mb-2 text-xl font-bold">All Users</p>
          </div>
          <div className="flex flex-row items-end w-full md:max-w-md md:flex-col ">
            <div className="flex flex-col items-center w-full max-w-sm gap-2 md:flex-row ">
              <Search setSearch={setSearch} text={"username or email or phone"} name={"client"} />
            </div>
          </div>
        </div>
        <div className="mb-8 overflow-x-scroll scrollbar-hide">
          <StageLoading isLoading={isLoading} isError={isError} isSuccess={isSuccess} error={error}>
            <TableTemp
              rightPage={rightPage}
              btn={false}
              linkUrl="/all-users/details"
              customID={true}
              assignLinkOnHeader="id_img1"
              linkOnly={true}
              linkFieldName="full_name"
              isImage={true}
              isImageLink={false}
              tableHead={tableHead}
              data={data}
              fieldsToShow={fieldsToShow} />
          </StageLoading>
        </div>
      </Container>
      {!isError && <Paginate loadDataFn={handlePageClick} total={paginateData} />}
    </div>
  );
};

export default Users;