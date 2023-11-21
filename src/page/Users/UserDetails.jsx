import Toast from '../../utils/toast';
import { CgUnblock } from 'react-icons/cg';
import Modal from '../../components/Modals/Modal';
import React, { useEffect, useState } from 'react';
import Card from '../../components/dashboard/Card';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/share/ui/Container';
import TableHeader from '../../components/share/ui/TableHeader';
import { userLogout } from '../../redux/features/auth/authSlice';
import { showModal } from '../../redux/features/modals/modalSlices';
import BlockModal from '../../components/Modals/modalComponents/BlockModal';
import { useGetUsersDetailsMutation } from '../../redux/features/users/usersApi';
import PhoneNumberValidation from '../../components/PhoneNumberValidation/PhoneNumberValidation';
import { Link, useParams } from 'react-router-dom';
import { BlockIcon, BookingIcon, BookingIconUserDetails, DepositIcon, MainBalanceIcon, PdfIcon, TotalBooking, } from '../../Assets/locales/UserDetailsIcons';

const UsersDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { errorToast } = Toast()

  const [modalContent, setModalContent] = useState();
  const { details } = useSelector(state => state.users)
  const [phoneNumber, setPhoneNumber] = useState(details?.mobile_no || '');


  const [getUsersDetails, { isError, isLoading, error }] = useGetUsersDetailsMutation()
  const loadDataFn = async () => { await getUsersDetails(decodeURIComponent(id)) }
  useEffect(() => { loadDataFn() }, [id])
  useEffect(() => { setPhoneNumber(details?.mobile_no || '') }, [details])
  const data = [
    { name: "Main  Balance ", value: "৳2,580", url: "some url", icon: <MainBalanceIcon /> },
    { name: "Deposit Balance", value: "৳2,580", url: "some url", icon: <DepositIcon /> },
    { name: "Total Booking", value: "৳2,580", url: "some url", icon: <TotalBooking /> },
    { name: "Total Job Post", value: "৳2,580", url: "some url", icon: <BookingIconUserDetails /> },
    { name: "Canceled Booking", value: "৳2,580", url: "some url", icon: <BookingIconUserDetails /> },
    { name: "Completed Booking", value: "৳2,580", url: "some url", icon: <BookingIconUserDetails /> },
  ]
  // const ref = useRef(null)
  // const handleForm = (e) => {
  //   e.preventDefault()
  //   const form = e.target
  //   const first_name = form.first_name.value;
  //   const last_name = form.last_name.value;
  //   const username = form.username.value;
  //   const date_of_birth = form.date_of_birth.value;
  //   const age = form.age.value;
  //   const email = form.email.value;
  //   const phone_number = form.phone_number.value;
  //   const address = form.address.value;
  //   const data = { first_name, last_name, username, date_of_birth, age, email, phone_number, address }
  //   // console.log(data);
  // }
  const BlockFn = (item) => {
    setModalContent(null)
    dispatch(showModal({ show: true, title: details?.status === "active" ? "block" : "active", width: "max-w-lg", selectedItem: { ...item, name: item.full_name }, }))
    setModalContent(<BlockModal name="user" reloadFn={loadDataFn} />)
  }
  useEffect(() => {
    if (isError) {
      error.data.error === "Token Expired Please Login." ?
        (errorToast("Token Expired"), forceLogout()) : errorToast("internal server error")
    }
  }, [isError, error])

  const forceLogout = () => {
    localStorage.removeItem('auth')
    dispatch(userLogout(undefined))
  }
  return (
    <div className='min-h-screen bg-white'>
      <div className="flex items-center justify-between px-4 md:px-8">
        <div className="-ml-4 md:-ml-8">
          <TableHeader title={"Users Details"} />
        </div>
        <div className="">
          {/* //! needed */}
          {/* <Options options={['Daily', "Weekly", "Monthly", "Yearly", "Life Time"]} /> */}
        </div>
      </div>
      <Container>
        {isLoading ? <div className="flex flex-col mt-10 ">
          <span className="loading loading-bars loading-md"></span></div>
          : isError ? <div className="mt-10 text-red-400 "> something is not right </div> :
            <>
              {/* user info */}
              <section>
                <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-12">
                  <div className="col-span-1 md:col-span-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {data.map((item, i) => <Card className={""} data={item} key={i} />)}
                    </div>
                  </div>
                  <div className="col-span-1 bg-white md:col-span-4">
                    <img src="https://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg" className='w-full h-full max-h-[330px] rounded-md' alt="" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 duration-300 md:gap-2 xl:gap-4 md:grid-cols-4">
                  <div className="">
                    <p className='mb-1'>All Booking</p>
                    <div className="bg-[#63C054] bg-opacity-40  text-[#63C054] rounded-md cursor-pointer">
                      <Link to={`/users/details/user-all-bookings/${encodeURIComponent(details.id)}`}
                        className="flex items-center justify-center gap-2 py-6 ">
                        <BookingIcon className='w-10 h-10' colorCode={"#63C054"} />
                        <p>All Booking</p>
                      </Link>
                    </div>
                  </div>
                  <div className="">
                    <p className='mb-1'>Cancel Booking</p>
                    <div className="text-red-500 bg-red-500 rounded-md bg-opacity-40">
                      <div className="flex items-center justify-center gap-2 py-6 cursor-pointer">
                        <BookingIcon className='w-10 h-10' colorCode={"#F76868"} />
                        <p>Cancel Booking</p>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <p className='mb-1'>  User Logins  History </p>
                    <div className="bg-[#3B76E1] bg-opacity-30  text-[#3B76E1] rounded-md">
                      <Link to={`/users/login-history/${encodeURIComponent(details?.id)}`}
                        className="flex items-center justify-center gap-2 py-6 cursor-pointer">
                        <BookingIcon className='w-10 h-10' colorCode={"#3B76E1"} />
                        <p>Logins History</p>
                      </Link>
                    </div>
                  </div>
                  <div className="">
                    <p className='mb-1'>{details.status === "active" ? "Block user" : "Unblock user"}</p>
                    <div className={`${details.status === "active" ? "text-red-500 bg-red-500" : "bg-[#3B76E1] text-[#3B76E1]"}  rounded-md bg-opacity-40`}>
                      <div
                        onClick={() => BlockFn(details)}
                        className="flex items-center justify-center gap-2 py-6 cursor-pointer">
                        {!details.status === "active" ? <BlockIcon className='w-10 h-10' colorCode={"#F76868"} /> :
                          <CgUnblock colorCode={"#F76868"} />
                        }
                        <p> {details.status === "active" ? "Block" : "UnBlock"} </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* end user info */}

              {/* User Information input */}
              <section className='my-8'>
                <div className="flex justify-between item-center">
                  <p className="text-xl font-bold capitalize">
                    User Information
                  </p>
                  <div className="flex items-center gap-2">
                    <PdfIcon className="w-2 h-6 text-blue-400" />
                    <p className="text-blue-400 ">
                      Document  {/* //! missing */}
                    </p>
                  </div>
                </div>
                <form
                  // onSubmit={handleForm}
                  // ref={ref}
                  className="grid grid-cols-6 gap-4 mt-6">
                  <div className="col-span-6 md:col-span-3">
                    <div className="">
                      <p className='mb-1'>Full Name</p> {/* //! missing */}
                      <input
                        value={details?.full_name}
                        disabled
                        required
                        name='first_name'
                        type="text" className='w-full px-2 py-2 border rounded-md focus:outline-none' />
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-3">
                    <div className="">
                      <p className='mb-1'>Username</p>  {/* //! missing */}
                      <input
                        required
                        value={details?.username}
                        disabled
                        name='username'
                        type="text" className='w-full px-2 py-2 border rounded-md focus:outline-none' />
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <div className="">
                      <p className='mb-1'>Date of birth</p>
                      <input
                        required
                        disabled
                        value={details?.birth_date}
                        type="date"
                        name='date_of_birth'
                        className='w-full px-2 py-2 border rounded-md focus:outline-none' />
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <div className="">
                      <p className='mb-1'>Age</p>
                      <input
                        required
                        name='age'
                        value={details?.age}
                        disabled
                        type="number" className='w-full px-2 py-2 border rounded-md focus:outline-none' />
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <div className="">
                      <p className='mb-1'>Email address</p>
                      <input
                        required
                        name='email'
                        disabled
                        value={details?.email}
                        type="email" className='w-full px-2 py-2 border rounded-md focus:outline-none' />
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <div className="relative">
                      <p className='mb-1'>Phone Number</p>
                      <div className="relative flex w-full rounded-md">
                        <PhoneNumberValidation phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
                      </div>
                    </div>
                  </div>
                  {/* one input */}
                  <div className="col-span-6">
                    <div className="">
                      <p className='mb-1'>Address</p>
                      <textarea
                        required
                        disabled
                        value={details.address}
                        name='address'
                        type="text" className='flex justify-start w-full h-24 p-4 border rounded-md focus:outline-none' />
                    </div>
                  </div>
                  {/* Verified status */}
                  {/* <div className="col-span-6 md:col-span-3">
                    <p className='mb-1'>Email Address </p>
                    <div className="bg-[#63C054] bg-opacity-40 py-3 text-[#63C054] rounded-md">
                      <div className="flex items-center justify-center gap-2 cursor-pointer">
                        <p>Verified</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <p className='mb-1'>Phone Number</p>
                    <div className="py-3 text-red-500 bg-red-500 rounded-md bg-opacity-40">
                      <div className="flex items-center justify-center gap-2 cursor-pointer">
                        <p>Unverified</p> 
                      </div>
                    </div>
                  </div> */}
                  {/* device Information */}
                  {/* 
            <p className='col-span-6 mt-4 text-xl font-bold'> Device Information</p>
            <div className="col-span-6 md:col-span-2">
              <div className="">
                <p className='mb-1'>Device Name</p>
                <input
                  disabled
                  defaultValue={"s22"}
                  type="text" className='w-full px-2 py-2 border rounded-md shadow-md focus:outline-none' />
              </div>
            </div>
            <div className="col-span-6 md:col-span-2">
              <div className="">
                <p className='mb-1'>IP Address</p>
                <input
                  disabled
                  defaultValue={"123123.3123.3123123"}
                  type="text" className='w-full px-2 py-2 border rounded-md shadow-md focus:outline-none' />
              </div>
            </div>
            <div className="col-span-6 md:col-span-2">
              <div className="">
                <p className='mb-1'>Operating System</p>
                <input
                  disabled
                  defaultValue={"Android 11"}
                  type="text" className='w-full px-2 py-2 border rounded-md shadow-md focus:outline-none' />
              </div>
            </div> */}


                  {/* <button className='col-span-6 py-3 mt-8 rounded-md bg-primary text-secondary' >
              Submit
            </button> */}
                </form>
              </section>

            </>

        }



      </Container>
      <Modal modalContent={modalContent} />
    </div>

  );
};

export default UsersDetails;