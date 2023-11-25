import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Toast from "../../utils/toast";
import Container from "../../components/share/ui/Container";
import TableHeader from "../../components/share/ui/TableHeader";
import { userLogout } from "../../redux/features/auth/authSlice";
import {
    useGetAccountDetailsMutation,
    useUpdateAccountDetailsMutation,
} from "../../redux/features/users/usersApi";

const AccountDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { errorToast } = Toast();
    const { details } = useSelector((state) => state.users);
    const [getAccountDetails, { isError, isLoading, error }] =
        useGetAccountDetailsMutation();
    const [updateAccountDetails] = useUpdateAccountDetailsMutation();
    const [accountDetails, setAccountDetails] = useState({
        employee_name: "",
        bank_name: "",
        account_holder: "",
        account_number: "",
        bank_branch: "",
        bank_swift_code: "",
    });

    useEffect(() => {
        if (id) {
            getAccountDetails(decodeURIComponent(id));
        }
    }, [id]);

    useEffect(() => {
        if (details) {
            setAccountDetails({ ...details });
        }
    }, [details]);

    useEffect(() => {
        if (isError) {
            errorToast(error?.data?.error || "Internal server error");
            if (error?.data?.error === "Token Expired Please Login.") {
                forceLogout();
            }
        }
    }, [isError, error]);

    const handleInputChange = (e) => {
        setAccountDetails({
            ...accountDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await updateAccountDetails({ account_id: id, ...accountDetails });
    };

    const forceLogout = () => {
        localStorage.removeItem("auth");
        dispatch(userLogout(undefined));
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="flex items-center justify-between px-4 md:px-8">
                <div className="-ml-4 md:-ml-8">
                    <TableHeader title={"Account Details"} />
                </div>
            </div>
            <Container>
                {isLoading ? (
                    <div className="flex flex-col mt-10 ">
                        <span className="loading loading-bars loading-md"></span>
                    </div>
                ) : isError ? (
                    <div className="mt-10 text-red-400 ">
                        {" "}
                        something is not right{" "}
                    </div>
                ) : (
                    <>
                        <section className="my-8">
                            <div className="flex justify-between item-center">
                                <p className="text-xl font-bold capitalize">
                                    Bank Account Information
                                </p>
                                <div className="flex items-center gap-2"></div>
                            </div>
                            <form
                                onSubmit={handleFormSubmit}
                                className="my-8 grid grid-cols-6 gap-4"
                            >
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">Employee Name</p>
                                        <input
                                            value={accountDetails.employee_name}
                                            disabled
                                            required
                                            name="employee_name"
                                            type="text"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">Bank Name</p>
                                        <input
                                            required
                                            name="bank_name"
                                            value={accountDetails.bank_name}
                                            onChange={handleInputChange}
                                            type="text"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">Account Holder</p>
                                        <input
                                            required
                                            value={
                                                accountDetails.account_holder
                                            }
                                            onChange={handleInputChange}
                                            type="text"
                                            name="account_holder"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">Account Number</p>
                                        <input
                                            required
                                            value={
                                                accountDetails.account_number
                                            }
                                            onChange={handleInputChange}
                                            type="text"
                                            name="account_number"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">Bank Branch</p>
                                        <input
                                            required
                                            value={accountDetails.bank_branch}
                                            onChange={handleInputChange}
                                            type="text"
                                            name="bank_branch"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">Bank Swift_code</p>
                                        <input
                                            required
                                            value={
                                                accountDetails.bank_swift_code
                                            }
                                            onChange={handleInputChange}
                                            type="text"
                                            name="bank_swift_code"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <button className="col-span-6 py-3 mt-8 rounded-md bg-primary text-secondary">
                                    Submit
                                </button>
                            </form>
                        </section>
                    </>
                )}
            </Container>
        </div>
    );
};

export default AccountDetails;
