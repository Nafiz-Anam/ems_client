import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import rememberMe from "../../utils/rememberMe";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname;

    const { setUserDetails, getUserDetails, removeUserDetails } = rememberMe();
    const authInfo = getUserDetails("autInfo")
        ? getUserDetails("autInfo")
        : null;
    const [rememberMeValue, setRememberMeValue] = useState(
        authInfo ? true : false
    );
    const [LoginInfo, setLoginInfo] = useState(
        authInfo ? authInfo : { email: "", password: "" }
    );
    // redux store
    const [login, { isError, isLoading, isSuccess, error }] =
        useLoginMutation();
    if (rememberMeValue) {
        setUserDetails("autInfo", LoginInfo);
    } else {
        removeUserDetails("autInfo");
    }

    function LoginFun() {
        login({ email: LoginInfo.email, password: LoginInfo.password });
    }
    useEffect(() => {
        isError
            ? toast.error(error.data.error, { position: "top-right" })
            : isSuccess
            ? (toast.success("Login success", { position: "top-right" }),
              navigateFn())
            : null;
    }, [isError, isLoading, isSuccess]);

    const navigateFn = () => {
        setTimeout(() => {
            navigate(from ? from : "/", { replace: true });
        }, 100);
    };
    return (
        <Fragment>
            <div className="flex items-center justify-center w-full min-h-screen py-5 bg-gray-300 ">
                <div className="mx-auto w-full  rounded-t-xl  md:max-w-[600px]  px-4">
                    <div className="login_banner rounded-t-lg pt-[4.875rem] pb-[4.938rem] bg-primary ">
                        <div className="px-2 text-center">
                            <h2 className="mb-2 font-poppins text-[2rem] leading-[2.6rem]">
                                Welcome To EMS Application
                            </h2>
                            <h2 className="text-lg leading-[1.463rem]">
                                Admin Login To EMS Application Dashboard
                            </h2>
                        </div>
                    </div>
                    <div className="px-[1rem] pt-[4.063rem] pb-[3rem] md:px-[2.125rem] lg:px-[3.125rem] bg-primary rounded-b-lg ">
                        <div className="space-y-5">
                            <div className="flex flex-col gap-2">
                                <label
                                    className="inter-500 text-base leading-[1.3rem] text-white"
                                    htmlFor="Username"
                                >
                                    Email Address
                                    <span className="text-[#D3AC46]">*</span>
                                </label>
                                <input
                                    className="poppins-400 rounded border-[0.031rem] border-[#fff] bg-transparent px-4 py-2.5 text-lg leading-[1.463rem] text-white"
                                    type="text"
                                    placeholder="Email or Username"
                                    value={LoginInfo.email || ""}
                                    onChange={(e) =>
                                        setLoginInfo({
                                            ...LoginInfo,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2 ">
                                <label className="inter-500 text-base leading-[1.3rem] text-white">
                                    Password{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="poppins-400 rounded border-[0.031rem] border-[#fff] bg-transparent px-4 py-2.5 text-lg leading-[1.463rem] text-[#fff]"
                                    type="password"
                                    placeholder="Password"
                                    value={LoginInfo.password || ""}
                                    onChange={(e) =>
                                        setLoginInfo({
                                            ...LoginInfo,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="flex flex-wrap items-center justify-between">
                                <div
                                    onClick={() =>
                                        setRememberMeValue(!rememberMeValue)
                                    }
                                    className="flex flex-wrap items-center gap-2 cursor-pointer text-secondary "
                                >
                                    <input
                                        type="checkbox"
                                        defaultChecked={rememberMeValue}
                                        className="bg-gray-300 checkbox checkbox-xs"
                                    />
                                    remember me
                                </div>
                                <div>
                                    <Link
                                        className="font-poppins text-base leading-[1.3rem] text-white hover:text-blue-500 hover:underline hover:underline-offset-2"
                                        to="/recover-account"
                                    >
                                        Forget Password?
                                    </Link>
                                </div>
                            </div>
                            <div>
                                {LoginInfo.email === "" ||
                                LoginInfo.password === "" ? (
                                    <button
                                        disabled
                                        className=" inter-600 w-full bg-[#D3AC36] p-2.5 text-base font-bold leading-[1.3rem] tracking-[2%] text-[#222202]"
                                    >
                                        Login Disabled
                                    </button>
                                ) : (
                                    <button
                                        disabled={isLoading}
                                        onClick={() => LoginFun()}
                                        className={` w-full h-10 flex items-center justify-center  p-2.5 text-base font-bold leading-[1.3rem] t text-[#222222] ${
                                            isLoading
                                                ? " bg-gray-400 "
                                                : "bg-[#D3AC46]"
                                        }`}
                                    >
                                        {isLoading ? (
                                            <span className="loading loading-bars loading-sm"></span>
                                        ) : (
                                            "Login"
                                        )}
                                    </button>
                                )}
                            </div>
                            <div>
                                <p className="text-center font-poppins text-base leading-[1.3rem] text-white">
                                    New User?{" "}
                                    <Link
                                        className="font-poppins text-base leading-[1.3rem] text-white hover:text-blue-500 hover:underline hover:underline-offset-2"
                                        to="/registration"
                                    >
                                        Register Now
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
