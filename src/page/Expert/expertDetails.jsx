import React, { useEffect, useState } from 'react';
import { BlockIcon, BookingIcon, BookingIconUserDetails, DepositIcon, MainBalanceIcon, PdfIcon, TotalBooking } from '../../Assets/locales/UserDetailsIcons';
import TableHeader from '../../components/share/ui/TableHeader';
import Card from '../../components/dashboard/Card';
import PhoneNumberValidation from '../../components/PhoneNumberValidation/PhoneNumberValidation';
import Container from '../../components/share/ui/Container';
import { BagIcon, LoadingIcon } from '../../Assets/icons';
import { Options } from '../../components/share/ui/Dropdown';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetExpertsDetailsMutation } from '../../redux/features/Expert/expertApi';
import Toast from '../../utils/toast';
import { showModal } from '../../redux/features/modals/modalSlices';
import BlockModal from '../../components/Modals/modalComponents/BlockModal';
import { userLogout } from '../../redux/features/auth/authSlice';
import { CgUnblock } from 'react-icons/cg';
import Modal from '../../components/Modals/Modal';

const ExpertDetails = () => {
  const { id } = useParams()
  const { errorToast } = Toast()
  const dispatch = useDispatch()
  const { expertDetails } = useSelector(state => state.expert)
  const [modalContent, setModalContent] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(expertDetails?.mobile_no || '');
  const [getExpertsDetails, { error, isError, isLoading, }] = useGetExpertsDetailsMutation()
  const loadDataFn = async () => {
    await getExpertsDetails(decodeURIComponent(id))
  }
  // console.log(decodeURIComponent(id));
  // console.log(expertDetails);
  // console.log(error);

  useEffect(() => { loadDataFn() }, [])
  useEffect(() => { setPhoneNumber(expertDetails?.mobile_no || '') }, [expertDetails])
  const data = [
    { name: "Main  Balance ", value: "৳2,580", url: "some url", icon: <MainBalanceIcon /> },
    { name: "Deposit Balance", value: "৳2,580", url: "some url", icon: <DepositIcon /> },
    { name: "Total Booking", value: "৳2,580", url: "some url", icon: <TotalBooking /> },
    { name: "Total Job Post", value: "৳2,580", url: "some url", icon: <BookingIconUserDetails /> },
  ]
  const EarningData = [
    { name: "Total Users", value: 15, bg: "bg-[#AA72EB]", icon: <BagIcon /> },
    { name: "Total Active Users", value: 13, bg: "bg-[#1DCBA8]", icon: <BagIcon /> },
    { name: "New User", value: 13, url: "add later ", bg: "bg-[#FFAF3D]", icon: <LoadingIcon /> },
    { name: "Total Product", value: 13, bg: "bg-[#FF6A6A]", icon: <BagIcon /> }
  ]


  const BlockFn = (item) => {
    setModalContent(null)
    dispatch(showModal({ show: true, title: expertDetails?.status === "active" ? "block" : "active", width: "max-w-lg", selectedItem: { ...item, name: item.full_name }, }))
    setModalContent(<BlockModal name="expert" reloadFn={loadDataFn} />)
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
          <TableHeader title={"Experts Details"} />
        </div>
        <div className="">
          <Options options={['Daily', "Weekly", "Monthly", "Yearly", "Life Time"]} />
        </div>
      </div>

      {isLoading ? <div className="flex flex-col mt-10">
        <span className="ml-20 loading loading-bars loading-md"></span></div>
        : isError ? <div className="mt-10 text-red-400 "> something is not right </div> :
          <Container>

            {/* user info */}
            <section>
              <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-12">
                <div className="col-span-1 md:col-span-8">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {data.map((data, i) => <Card className={"p-8"} data={data} key={i} />)}
                  </div>
                </div>
                <div className="col-span-1 bg-white md:col-span-4">
                  <img src="https://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg" className='w-full h-full max-h-[330px] rounded-md' alt="" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 py-4 mb-4 md:grid-cols-3 md:gap-6 md:py-2 xl:grid-cols-4 lg:gap-6 2xl:grid-cols-4">
                {EarningData?.map((earnData) =>
                  <>
                    <Card className={`${earnData.bg} text-white group hover:bg-primary hover:text-white`} data={earnData} />
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 duration-300 md:gap-2 xl:gap-4 md:grid-cols-4">
                <div className="">
                  <p className='mb-1'>Expert services</p>
                  <div className="bg-[#E4641B] bg-opacity-40 text-[#E4641B] rounded-md">
                    <Link to={`/expert-services-request/${encodeURIComponent(expertDetails?.id)}`}
                      className="flex items-center justify-center gap-2 py-6 cursor-pointer">
                      <BookingIcon className='w-10 h-10' colorCode={"#E4641B"} />
                      <p>Expert services </p>
                    </Link>
                  </div>
                </div>
                <div className="">
                  <p className='mb-1'>All Orders</p>
                  <div className="bg-[#63C054] bg-opacity-40 text-[#63C054] rounded-md">
                    <Link to={`/experts/all-expert/details/experts-all-orders/${encodeURIComponent(expertDetails?.id)}`}
                      className="flex items-center justify-center gap-2 py-6 cursor-pointer">
                      <BookingIcon className='w-10 h-10' colorCode={"#63C054"} />
                      <p>All Orders </p>
                    </Link>
                  </div>
                </div>
                <div className="">
                  <p className='mb-1'>  User Logins  History </p>
                  <div className="bg-[#3B76E1] bg-opacity-30  text-[#3B76E1] rounded-md">
                    <Link to={`/users/login-history/${encodeURIComponent(expertDetails?.id)}`}
                      className="flex items-center justify-center gap-2 py-6 cursor-pointer">
                      <BookingIcon className='w-10 h-10' colorCode={"#3B76E1"} />
                      <p>Logins History</p>
                    </Link>
                  </div>
                </div>
                <div className="">
                  <p className='mb-1'>{expertDetails.status === "active" ? "Block user" : "Active user"}</p>
                  <div className={`${expertDetails.status === "active" ? "text-red-500 bg-red-500" : "bg-[#63C054] text-[#63C054]"}  rounded-md bg-opacity-40`}>
                    <div
                      onClick={() => BlockFn(expertDetails)}
                      className="flex items-center justify-center gap-2 py-6 cursor-pointer">
                      {!expertDetails.status === "active" ? <BlockIcon className='w-10 h-10' colorCode={"#F76868"} /> :
                        <CgUnblock colorCode={"#F76868"} />
                      }
                      <p> {expertDetails.status === "active" ? "Block" : "Active"} </p>
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
                    Document
                  </p>
                </div>
              </div>
              <form
                // onSubmit={handleForm}
                // ref={ref}
                className="grid grid-cols-6 gap-4 mt-6">
                <div className="col-span-6 md:col-span-2">
                  <div className="">
                    <p className='mb-1'>First Name</p> {/* //! missing */}
                    <input
                      value={expertDetails?.first_name}
                      disabled
                      required
                      name='first_name'
                      type="text" className='w-full px-2 py-2 border rounded-md focus:outline-none' />
                  </div>
                </div>
                <div className="col-span-6 md:col-span-2">
                  <div className="">
                    <p className='mb-1'>Last Name</p> {/* //! missing */}
                    <input
                      value={expertDetails?.last_name}
                      disabled
                      required
                      name='last_name'
                      type="text" className='w-full px-2 py-2 border rounded-md focus:outline-none' />
                  </div>
                </div>
                <div className="col-span-6 md:col-span-2">
                  <div className="">
                    <p className='mb-1'>Username</p>  {/* //! missing */}
                    <input
                      required
                      value={expertDetails?.username}
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
                      value={expertDetails?.birth_date}
                      type="date"
                      name='date_of_birth'
                      className='w-full px-2 py-2 border rounded-md focus:outline-none' />
                  </div>
                </div>
                <div className="col-span-6 md:col-span-3">
                  <div className="">
                    <p className='mb-1'>Age</p>   {/* //! missing */}
                    <input
                      required
                      name='age'
                      value={expertDetails?.age}
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
                      value={expertDetails?.email}
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
                      value={expertDetails?.address}
                      name='address'
                      type="text" className='flex justify-start w-full h-24 p-4 border rounded-md focus:outline-none' />
                  </div>
                </div>

                {/* Verified status */}
                <div className="col-span-6">
                  <p className='mb-1'>KYC Verified  </p>
                  <div className="bg-[#63C054] bg-opacity-40 py-3 text-[#63C054] rounded-md">
                    <div className="flex items-center justify-center gap-2 cursor-pointer">
                      <p>Verified</p>
                    </div>
                  </div>
                </div>

                {/* device Information */}
                {/* <p className='col-span-6 mt-4 text-xl font-bold'> Device Information</p>
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
            </div>
            <button className='col-span-6 py-3 mt-8 rounded-md bg-primary text-secondary' >
              Update
            </button> */}
              </form>
            </section>
          </Container>
      }
      <Modal modalContent={modalContent} />
    </div>
  );
};

export default ExpertDetails;