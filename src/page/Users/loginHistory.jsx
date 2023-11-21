import React, { useEffect, useState } from 'react';
import TableTemp from '../../components/share/ui/TableTemp';
import Container from '../../components/share/ui/Container';
import TableHeader from '../../components/share/ui/TableHeader';
import { useUserLoginHistoryMutation } from '../../redux/features/users/usersApi';
import { useParams } from 'react-router-dom';
import { SkeletonLoader } from '../../components/share/loading/SkeletonLoader';
import StageLoading from '../../components/share/loading/StageLoading';

const LoginHistory = () => {
  const [data, setData] = useState([])
  const { id } = useParams()

  const deId = decodeURIComponent(id)

  const tableHeader = [
    { name: 'Username', field: 'user_name' },
    { name: 'Device Name', field: 'device_name' },
    { name: 'Country', field: 'country' },
    { name: 'Browser', field: 'browser' },
    { name: 'Ip address', field: 'ip_address' },
    { name: 'login at', field: 'created_at' },
  ]
  const fieldToShow = ["user_name", "device_name", "country", "browser", "ip_address", "created_at"]
  const [userLoginHistory, { isError, isLoading, isSuccess }] = useUserLoginHistoryMutation()
  const loadDataFn = async () => {
    const response = await userLoginHistory(deId)
    setData(response)
  }

  useEffect(() => {
    loadDataFn()
  }, [])

  return (
    <div className=''>
      <TableHeader title={"Login History"} />
      <Container>
        <div className="md:flex mb-[37px] mt-[30px] items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="mb-2 text-xl font-bold">Login history</p>
          </div>
        </div>
        <div className="mb-8 overflow-x-scroll scrollbar-hide">
          <StageLoading isError={isError} isLoading={isLoading} isSuccess={isSuccess} data={data}>
            <TableTemp
              btn={false}
              linkUrl="/all-users/details"
              customID={true}
              assignLinkOnHeader="id_img1"
              linkOnly={true}
              linkFieldName="full_name"
              isImage={true}
              isImageLink={false}
              tableHead={tableHeader}
              data={data?.data?.data}
              fieldsToShow={fieldToShow}
            // actionData={ActionData}
            />
          </StageLoading>
        </div>
      </Container>
    </div>
  );
};

export default LoginHistory;