import React, { useEffect } from 'react';
import TableHeader from '../../components/share/ui/TableHeader';
import Container from '../../components/share/ui/Container';
import { Link, useParams } from 'react-router-dom';
import { useGetExpertsRequestDetailsMutation, useUpdateExpertsRequestMutation } from '../../redux/features/Expert/expertApi';
import { useSelector } from 'react-redux';

const ExpertRequestDetails = () => {
  const { id } = useParams()
  const { expertRequestsDetails } = useSelector(state => state.expert)
  const [getExpertsRequestDetails] = useGetExpertsRequestDetailsMutation()
  const [updateExpertsRequest, { isLoading }] = useUpdateExpertsRequestMutation()

  const UpdateExpertRequest = (id, type) => { updateExpertsRequest({ id, status: type === "approve" ? 0 : 2 }) }
  useEffect(() => { getExpertsRequestDetails(decodeURIComponent(id)) }, [isLoading])
  return (
    <div className='bg-secondary'>
      <TableHeader title={"Expert Request Details"} />
      <Container className="flex flex-col">
        <div className="pb-[50px]  pt-[20px]">
          <div className="px-[30px] py-5 bg-white shadow-lg border">
            <div className="mb-[18px] flex w-full items-center justify-between ">
              <h1 className="font-poppins text-[18px] font-semibold text-secondBlack">
                Experts Request
              </h1>
              <Link
                to={`/experts/all-expert/details/${encodeURIComponent(expertRequestsDetails?.id)}`}
                className="rounded-md bg-[#398CC5] px-4 py-2 font-inter text-[16px] font-medium text-white"
              > Check experts Profile
              </Link>
            </div>
            <div className="collapse-open">
              <div className="flex items-center justify-between border border-b-0 px-4 py-[20px]">
                <p className="text-base font-medium font-poppins text-secondBlack">
                  Request Date & Time
                </p>
                <p className="font-medium text-4 font-poppins text-secondBlack">
                  <span className="text-gray-400">{expertRequestsDetails ? expertRequestsDetails?.created_at : "N/A"}</span>
                </p>
              </div>
              <div className="flex items-center justify-between border border-b-0 px-4 py-[20px]">
                <p className="text-base font-medium font-poppins text-secondBlack">
                  user ID
                </p>
                <p className="font-medium text-4 font-poppins text-secondBlack">
                  <span className="text-gray-400">{expertRequestsDetails?.useId ? expertRequestsDetails?.userId : "N/A"}</span>
                </p>
              </div>
              <div className="flex items-center justify-between border border-b-0 px-4 py-[20px]">
                <p className="text-base font-medium font-poppins text-secondBlack">
                  Username
                </p>
                <p className="font-medium text-4 font-poppins text-secondBlack">
                  <span className="text-gray-400">{expertRequestsDetails?.full_name
                    ? expertRequestsDetails?.full_name : "N/A"}</span>
                </p>
              </div>
              <div className="flex items-center justify-between border border-b-0 px-4 py-[20px]">
                <p className="text-base font-medium font-poppins text-secondBlack">
                  Transaction Method
                </p>
                <p className="font-medium text-4 font-poppins text-secondBlack">
                  <span className="text-gray-400">{expertRequestsDetails?.Transaction
                    ? expertRequestsDetails?.Transaction : "N/A"}</span>
                </p>
              </div>
              <div className="flex items-center justify-between border border-b-0 px-4 py-[20px]">
                <p className="text-base font-medium font-poppins text-secondBlack">
                  Phone Number
                </p>
                <p className="font-medium text-4 font-poppins text-secondBlack">
                  <span className="text-gray-400">{expertRequestsDetails?.mobile_no
                    ? expertRequestsDetails?.mobile_no : "N/A"}</span>
                </p>
              </div>
              <div className="flex items-center justify-between border border-b-0 px-4 py-[20px]">
                <p className="text-base font-medium font-poppins text-secondBlack">
                  Document
                </p>
                <p className="font-medium text-4 font-poppins text-secondBlack">
                  <span className="text-gray-400">No Document</span>
                </p>
              </div>
              <div className="flex items-center justify-between border px-4 py-[20px]">
                <p className="text-base font-medium font-poppins text-secondBlack">
                  Request Status
                </p>
                {expertRequestsDetails?.expert_request === "approve" ?
                  <p className="rounded-full bg-[#63AD6F1A] px-2 py-1 font-inter text-[14px] font-medium capitalize text-[#63AD6F]">
                    Approved</p> :
                  expertRequestsDetails?.expert_request === "pending" ?
                    <p className="rounded-full bg-[#FF9F431A] px-2 py-1 font-inter text-[14px] font-medium capitalize text-[#FF9F43]">
                      Pending </p> :
                    expertRequestsDetails?.expert_request === "reject" ?
                      <p className="rounded-full bg-[#F75F001A] px-2 py-1 font-inter text-[14px] font-medium capitalize text-[#F75F00]">
                        Canceled </p> : "N/A"}
              </div>
              {expertRequestsDetails?.expert_request ?
                <div className="flex items-center justify-between  px-4 py-[20px]">
                  <p className="text-base font-medium font-poppins text-secondBlack">
                  </p>
                  <p
                    className="font-medium text-4 font-poppins text-secondBlack">
                    <button
                      onClick={() => UpdateExpertRequest(expertRequestsDetails?.id, "reject")}
                      className="rounded-md bg-[#F75F00] px-4 py-2 font-inter text-[16px] font-medium text-white mr-4">
                      Reject
                    </button>
                    <button
                      disabled={isLoading}
                      onClick={() => UpdateExpertRequest(expertRequestsDetails?.id, "approve")}
                      className="rounded-md bg-[#398CC5] px-4 py-2 font-inter text-[16px] font-medium text-white w-28">  {isLoading ?
                        <span className="loading loading-bars loading-sm"></span> : "Approve"}
                    </button>
                  </p>
                </div> : ""}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ExpertRequestDetails;