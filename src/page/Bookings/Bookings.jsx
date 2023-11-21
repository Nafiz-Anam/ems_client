import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { bookingAllData } from '../../Assets/data/data';
import Search from '../../components/share/search/Search';
import Container from '../../components/share/ui/Container';
import TableTemp from '../../components/share/ui/TableTemp';
import TableHeader from '../../components/share/ui/TableHeader';
import Paginate from '../../components/share/Paginate/Paginate';
import StageLoading from '../../components/share/loading/StageLoading';
import { useGetBookingMutation } from '../../redux/features/Booking/bookingApi';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

const Bookings = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id, expertId } = useParams()


  const [search, setSearch] = useState()
  const [rightPage, setRightPage] = useState(1)
  const [paginateData, setPaginateData] = useState([])

  const [getBooking, { isLoading, isSuccess, isError, error }] = useGetBookingMutation()
  const { booking } = useSelector(state => state.booking)

  const loadDataFn = async (page) => {
    if (search?.booking) { setRightPage(1) }
    const res = await getBooking({
      expert_id: expertId ? decodeURIComponent(expertId) : null,
      client_id: id ? decodeURIComponent(id) : null,
      page,
      search: search?.booking,

    })
    setPaginateData(res)
  }
  useEffect(() => { loadDataFn(rightPage) }, [search, id, expertId])

  // paginateFN
  const handlePageClick = (data) => {
    let selected = data.selected;
    if (selected === 0) return loadDataFn(1);
    loadDataFn(selected + 1);
    setRightPage(selected + 1)
  };

  const navigateInvoice = (data) => {
    navigate(`/booking/booking-details/${data.id}?invoice=true`)
  }
  const navigateDetails = (data) => {
    navigate(`/booking/booking-details/${data.id}?invoice=false`)
  }

  let filterData = []
  let title = "All Bookings List"
  if (location.pathname == "/booking") {
    filterData = bookingAllData;
  } else if (location.pathname == "/booking/completed") {
    title = "Completed List"
    filterData = bookingAllData.filter((item) => item.status == "Completed")
  } else if (location.pathname == "/booking/cancelled") {
    title = "Canceled List"
    filterData = bookingAllData.filter((item) => item.status == "Canceled")
  } else if (location.pathname == "/booking/on-going") {
    title = "On Going List"
    filterData = bookingAllData.filter((item) => item.status == "Ongoing")
  } else if (location.pathname == "/booking/accepted") {
    title = "Accepted List"
    filterData = bookingAllData.filter((item) => item.status == "Accepted")
  } else {
    <Navigate to={'/404'} />
  }



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
  const ActionData = [
    { name: "Invoice", fn: navigateInvoice },
    { name: "Order Details", fn: navigateDetails },
  ]


  return (
    <div className='bg-secondary'>
      <TableHeader title='Booking' />
      <Container>
        <div className="md:flex mb-[37px] mt-[30px] items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="mb-2 text-xl font-bold">{title}</p>
          </div>
          <div className="flex flex-row items-end w-full md:max-w-md md:flex-col ">
            <div className="flex flex-col items-center w-full max-w-sm gap-2 md:flex-row ">
              <Search setSearch={setSearch} text={"Title"} name={"booking"} />
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
              // linkFieldName="userName"
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
      {!isError && <Paginate loadDataFn={handlePageClick} total={paginateData} />}
    </div>
  );
};

export default Bookings;