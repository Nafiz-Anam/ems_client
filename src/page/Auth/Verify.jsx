import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVerifyPasswordOtpMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";

const Verify = () => {
    const navigate = useNavigate();

    const [verifyPasswordOtp, { error, isError, isSuccess, isLoading }] =
        useVerifyPasswordOtpMutation();
    const handleRecover = (e) => {
        e.preventDefault();
        verifyPasswordOtp({ otp: e.target.otp.value });
    };
    useEffect(() => {
        isError
            ? toast.error(error.data.error, { position: "top-right" })
            : isSuccess
            ? (toast.success("success", { position: "top-right" }),
              navigate("/auth/change-password"))
            : null;
    }, [isError, isLoading, isSuccess]);

    return (
        <div className="flex items-center justify-center w-full min-h-screen py-5 bg-gray-300">
            <div className="mx-auto min-w-[250px] rounded-t-xl rounded-b-lg bg-primary md:min-w-[400px] lg:min-w-[600px]">
                <div className="login_banner rounded-lg py-[5.875rem]">
                    <div className="text-center">
                        <h2 className="poppins-600 text-[2rem] leading-[2.6rem]">
                            Verify Account
                        </h2>
                    </div>
                </div>
                <form onSubmit={handleRecover}>
                    <div className="px-4  pt-[4.063rem] pb-[6rem] sm:px-[3.125rem]">
                        <div className="space-y-5">
                            <div className="flex flex-col gap-2">
                                <label className="inter-500 text-base leading-[1.3rem] text-secondary">
                                    OTP Verify
                                    <span className="text-[#D3AC46]">*</span>
                                </label>
                                <input
                                    required
                                    placeholder="Enter OTP"
                                    className="poppins-400 rounded border-[0.031rem] border-[#fff] bg-transparent px-4 py-2.5 text-lg leading-[1.463rem] text-secondary focus:outline-none"
                                    type="text"
                                    name="otp"
                                />
                            </div>
                            <div className="text-left">
                                <Link
                                    className="poppins-500 text-base leading-[1.3rem] text-white hover:text-blue-500 hover:underline hover:underline-offset-2"
                                    to="/login"
                                >
                                    Login Here
                                </Link>
                            </div>
                            <div>
                                <button
                                    // disabled={isLoading}
                                    className={` w-full h-10 flex items-center justify-center  p-2.5 text-base font-bold leading-[1.3rem] t text-[#222222] ${
                                        isLoading
                                            ? " bg-gray-400 "
                                            : "bg-[#D3AC46]"
                                    }`}
                                >
                                    {isLoading ? (
                                        <span className="loading loading-bars loading-sm"></span>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Verify;
