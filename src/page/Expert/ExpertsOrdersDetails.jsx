import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Search from '../../components/share/search/Search';
import Container from '../../components/share/ui/Container';
import TableTemp from '../../components/share/ui/TableTemp';
// import { expertBookingData } from '../../Assets/data/data';
import Paginate from '../../components/share/Paginate/Paginate';
import TableHeader from '../../components/share/ui/TableHeader';
import StageLoading from '../../components/share/loading/StageLoading';
import { useGetBookingMutation } from '../../redux/features/Booking/bookingApi';

const ExpertsOrdersDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [paginateData, setPaginateData] = useState([])
  const { booking } = useSelector(state => state.booking)
  const [getBooking, { isLoading, isSuccess, isError, error }] = useGetBookingMutation()

  const loadDataFn = async (page) => {
    const res = await getBooking({ page, expert_id: decodeURIComponent(id) })
    setPaginateData(res)
  }
  useEffect(() => { loadDataFn() }, [])

  const handlePageClick = (data) => {
    let selected = data.selected;
    if (selected === 0) return loadDataFn(1);
    loadDataFn(selected + 1);
  };

  const tableHeader = [
    { name: 'client Name', field: 'client_name' },
    { name: 'Expert Name', field: 'expert_name' },
    { name: 'Service', field: 'service_details.title' },
    { name: 'Booking Date', field: 'booking_date' },
    { name: 'Balance', field: 'service_details.budget' },
    { name: 'Payment Status', field: 'payment_status' },
    { name: 'Status', field: 'req_status' },
  ]
  const fieldToShow = ["client_name", "expert_name", "service_details.title", "booking_date", "service_details.budget", "payment_status", "req_status"]

  const navigateInvoice = (data) => {
    navigate(`/experts/all-expert/details/experts-all-orders/${id}/order-details/${data.id}?invoice=true`)
  }
  const navigateDetails = (data) => {
    navigate(`/experts/all-expert/details/experts-all-orders/${id}/order-details/${data.id}?invoice=false`)
  }
  const ActionData = [
    { name: "Invoice", fn: navigateInvoice },
    { name: "Order Details", fn: navigateDetails },
  ]
  return (
    <div className='bg-secondary'>
      <TableHeader title={"Experts"} />
      <Container>
        <div className="md:flex mb-[37px] mt-[30px] items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="mb-2 text-xl font-bold">Order Lists</p>
          </div>
          <div className="flex flex-row items-center w-full gap-4 md:max-w-md md:flex-col ">
            <div className="flex flex-col items-center w-full max-w-sm gap-2 md:flex-row ">
              <Search />
            </div>
          </div>
        </div>
        <div className="mb-8 overflow-x-scroll scrollbar-hide">
          <StageLoading isLoading={isLoading} isError={isError} isSuccess={isSuccess} data={booking} error={error}>
            <TableTemp
              btn={true}
              linkUrl={``}
              customID={true}
              assignLinkOnHeader="image"
              linkOnly={false}
              linkFieldName="userName"
              isImage={false}
              isImageLink={false}
              tableHead={tableHeader}
              data={booking}
              fixedWith={180}
              fieldsToShow={fieldToShow}
              actionData={ActionData} />
          </StageLoading>
        </div>
      </Container>
      {!isError && booking?.length > 0 ? <Paginate loadDataFn={handlePageClick} total={paginateData} /> : null}
    </div>
  );
};

export default ExpertsOrdersDetails;