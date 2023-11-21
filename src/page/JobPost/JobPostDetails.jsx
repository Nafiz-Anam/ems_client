import { useEffect } from "react";
import Container from "../../components/share/ui/Container";
import TableHeader from "../../components/share/ui/TableHeader";
import { useGetJopPostDetailsMutation } from "../../redux/features/jobPosts/jobPostApi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Toast from "../../utils/toast";
import { userLogout } from "../../redux/features/auth/authSlice";


const senderInformation = [
  { name: "Sender Name", value: "Rana" },
  { name: "Phone Number", value: "01800000000" },
  { name: "Gender", value: "Male" },
  { name: "Send By", value: "01600000000" },
];
const JobPostDetails = () => {
  const { id } = useParams()
  const { errorToast } = Toast()
  const dispatch = useDispatch()
  const { details } = useSelector(state => state.jobPost)
  const [getJopPostDetails, { isLoading, isSuccess, isError, error }] = useGetJopPostDetailsMutation()

  const handleLoadData = async () => {
    await getJopPostDetails(decodeURIComponent(id))
  }
  useEffect(() => { handleLoadData() }, [id])

  const date = new Date(details?.created_at)
  const dateFormate = date?.toLocaleDateString()
  const timeFormate = date?.toLocaleTimeString()
  const dateTimeFormate = `${dateFormate} ${timeFormate}`

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
    <div className="bg-secondary">
      <div className="">
        <TableHeader title="View Details" />
      </div>
      <Container>
        {isLoading ? <><span className="mt-10 loading loading-bars loading-md"></span></>
          : isError ? <div className="mt-10 text-red-400"> something is not right </div>
            : isSuccess ? !details ? <div className="mt-10">no data</div>
              : <div className="p-4 my-5 mb-8 bg-white rounded-lg font-manrope">
                <div>
                  <div className="w-full py-2 mb-6 text-base font-medium text-center text-white rounded-md bg-primary font-manrope lg:w-1/2">  INFO</div>
                  <h1 className="text-black text-[20px] font-semibold">ID #<span>{decodeURIComponent(id)}</span></h1>
                  <p className="text-gray-400 ">Booking Placed {dateTimeFormate}</p>
                </div>
                <div className="grid grid-cols-1 gap-4 pt-10 md:grid-cols-2">
                  <div className="p-4 py-3 rounded-lg bg-secondary">
                    <div className="flex flex-col gap-4 ">
                      <div className="">
                        <p className="mb-2 font-semibold">Job Title</p>
                        <p className="text-gray-600 ">{details?.title}</p>
                      </div>
                      <div className="">
                        <p className="mb-2 font-semibold">Description</p>
                        <p className="text-gray-600 ">{details?.description}</p>
                      </div>
                      <div className="">
                        <p className="mb-2 font-semibold">Project File</p>
                        <p className="text-gray-600 ">{details?.project_files}</p>
                      </div>
                      <div className="">
                        <p className="mb-2 font-semibold">Skills</p>
                        <p className="text-gray-600 ">{details?.skills}</p>
                      </div>
                      <div className="">
                        <p className="mb-2 font-semibold">Experience Scope</p>
                        <p className="text-gray-600 ">{details?.experience}</p>
                      </div>
                      <div className="">
                        <p className="mb-2 font-semibold">Budget</p>
                        <p className="text-gray-600 ">
                          {details?.payment_type} {' '} price :{details?.project_budget}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 py-3 rounded-lg bg-secondary h-fit">
                    {senderInformation.map((singleData, i) => (
                      <div key={i} className="flex items-center font-medium justify-between py-[6px]">
                        <span>{singleData.name}</span>
                        <span>{singleData.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div> :
              <div className="mt-10 text-red-500">
                something  unexpected  error happened (;
              </div>
        }
      </Container>
    </div>
  );
};
export default JobPostDetails;