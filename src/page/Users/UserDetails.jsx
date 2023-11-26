import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Toast from "../../utils/toast";
import Container from "../../components/share/ui/Container";
import TableHeader from "../../components/share/ui/TableHeader";
import Card from "../../components/dashboard/Card";
import Modal from "../../components/Modals/Modal";
import BlockModal from "../../components/Modals/modalComponents/BlockModal";
import { userLogout } from "../../redux/features/auth/authSlice";
import { showModal } from "../../redux/features/modals/modalSlices";
import { CgUnblock } from "react-icons/cg";
import {
    useGetUsersDetailsMutation,
    useUpdateUserDetailsMutation,
} from "../../redux/features/users/usersApi";
import {
    BlockIcon,
    BookingIcon,
    DepositIcon,
    MainBalanceIcon,
    TotalBooking,
} from "../../Assets/locales/UserDetailsIcons";

const UsersDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { errorToast } = Toast();
    const [modalContent, setModalContent] = useState();
    const { details } = useSelector((state) => state.users);
    const [getUsersDetails, { isError, isLoading, error }] =
        useGetUsersDetailsMutation();
    const [updateUserDetails] = useUpdateUserDetailsMutation();
    const [userData, setUserData] = useState({ ...details, profile_img: null });

    useEffect(() => {
        getUsersDetails(decodeURIComponent(id));
    }, [id, getUsersDetails]);

    useEffect(() => {
        setUserData({ ...details });
    }, [details]);

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUserDetails({ employee_id: id, ...userData });
    };

    useEffect(() => {
        if (isError) {
            errorToast(error?.data?.error || "Internal server error");
            if (error?.data?.error === "Token Expired Please Login.") {
                forceLogout();
            }
        }
    }, [isError, error]);

    const loadDataFn = async () => {
        await getUsersDetails(decodeURIComponent(id));
    };
    useEffect(() => {
        loadDataFn();
    }, [id]);
    const data = [
        {
            name: "Main  Salary",
            value: `$${userData.salary}`,
            url: "some url",
            icon: <MainBalanceIcon />,
        },
        {
            name: "Total Paid-off",
            value: `$${userData.total_amount_earned}`,
            url: "some url",
            icon: <DepositIcon />,
        },
        {
            name: "Current Month Payment",
            value: `$${userData.current_month_payment}`,
            url: "some url",
            icon: <TotalBooking />,
        },
        {
            name: "Working Month",
            value: `${userData.working_months}`,
            url: "some url",
            icon: <TotalBooking />,
        },
    ];
    const BlockFn = (item) => {
        setModalContent(null);
        dispatch(
            showModal({
                show: true,
                title: details?.status === "active" ? "block" : "active",
                width: "max-w-lg",
                selectedItem: { ...item, name: item.name },
            })
        );
        setModalContent(<BlockModal name="user" reloadFn={loadDataFn} />);
    };
    useEffect(() => {
        if (isError) {
            error.data.error === "Token Expired Please Login."
                ? (errorToast("Token Expired"), forceLogout())
                : errorToast("internal server error");
        }
    }, [isError, error]);

    const forceLogout = () => {
        localStorage.removeItem("auth");
        dispatch(userLogout(undefined));
    };
    return (
        <div className="min-h-screen bg-white">
            <div className="flex items-center justify-between px-4 md:px-8">
                <div className="-ml-4 md:-ml-8">
                    <TableHeader title={"Employee Details"} />
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
                        {/* user info */}
                        <section>
                            <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-12">
                                <div className="col-span-1 md:col-span-8">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {data.map((item, i) => (
                                            <Card
                                                className={""}
                                                data={item}
                                                key={i}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-1 bg-white flex m-auto md:col-span-4">
                                    <img
                                        src={details?.profile_img}
                                        className="w-[200px] h-[200px] max-h-[300px] rounded-md"
                                        alt=""
                                    />
                                </div>
                            </div>

                            <div className="pt-5 grid grid-cols-2 gap-4 duration-300 md:gap-2 xl:gap-4 md:grid-cols-5">
                                <div className="">
                                    <p className="mb-1">Bank Information</p>
                                    <div className="bg-[#63C054] bg-opacity-40  text-[#63C054] rounded-md cursor-pointer">
                                        <Link
                                            to={`/employees/account/details/${encodeURIComponent(
                                                details?.account_details
                                                    ?.account_id
                                            )}`}
                                            className="flex items-center justify-center gap-2 py-6 "
                                        >
                                            <BookingIcon
                                                className="w-10 h-10"
                                                colorCode={"#63C054"}
                                            />
                                            <p>Bank Account Information</p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="">
                                    <p className="mb-1">KYC Information</p>
                                    <div className="text-red-500 bg-red-500 rounded-md bg-opacity-40">
                                        <Link
                                            to={`/employees/kyc/details/${encodeURIComponent(
                                                details?.id
                                            )}`}
                                            className="flex items-center justify-center gap-2 py-6"
                                        >
                                            <BookingIcon
                                                className="w-10 h-10"
                                                colorCode={"#F76868"}
                                            />
                                            <p>KYC Information</p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="">
                                    <p className="mb-1">Contact Information</p>
                                    <div className="bg-[#3B76E1] bg-opacity-30  text-[#3B76E1] rounded-md">
                                        <Link
                                            to={`/employees/contact/details/${encodeURIComponent(
                                                details?.id
                                            )}`}
                                            className="flex items-center justify-center gap-2 py-6 cursor-pointer"
                                        >
                                            <BookingIcon
                                                className="w-10 h-10"
                                                colorCode={"#3B76E1"}
                                            />
                                            <p>Contact Information</p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="">
                                    <p className="mb-1">Academic Information</p>
                                    <div className="bg-[#e1b53b] bg-opacity-30  text-[#e19f3b] rounded-md">
                                        <Link
                                            to={`/employees/academic/details/${encodeURIComponent(
                                                details?.id
                                            )}`}
                                            className="flex items-center justify-center gap-2 py-6 cursor-pointer"
                                        >
                                            <BookingIcon
                                                className="w-10 h-10"
                                                colorCode={"#e19f3b"}
                                            />
                                            <p>Academic Information</p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="">
                                    <p className="mb-1">
                                        {details.status === "active"
                                            ? "Block Employee"
                                            : "Unblock Employee"}
                                    </p>
                                    <div
                                        className={`${
                                            details.status === "active"
                                                ? "text-red-500 bg-red-500"
                                                : "bg-[#3B76E1] text-[#3B76E1]"
                                        }  rounded-md bg-opacity-40`}
                                    >
                                        <div
                                            onClick={() => BlockFn(details)}
                                            className="flex items-center justify-center gap-2 py-6 cursor-pointer"
                                        >
                                            {!details.status === "active" ? (
                                                <BlockIcon
                                                    className="w-10 h-10"
                                                    colorCode={"#F76868"}
                                                />
                                            ) : (
                                                <CgUnblock
                                                    colorCode={"#F76868"}
                                                />
                                            )}
                                            <p>
                                                {" "}
                                                {details.status === "active"
                                                    ? "Deactivate"
                                                    : "Activate"}{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* end user info */}

                        {/* User Information input */}
                        <section className="my-8">
                            <div className="flex justify-between item-center">
                                <p className="text-xl font-bold capitalize">
                                    Employee Information
                                </p>
                                <div className="flex items-center gap-2"></div>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-6 gap-4 mt-6"
                            >
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">Name</p>
                                        <input
                                            value={userData.name || ""}
                                            onChange={handleInputChange}
                                            required
                                            name="name"
                                            type="text"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">Email address</p>
                                        <input
                                            required
                                            name="email"
                                            value={userData.email || ""}
                                            onChange={handleInputChange}
                                            type="email"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="relative">
                                        <p className="mb-1">Phone Number</p>
                                        <input
                                            required
                                            name="phone"
                                            value={userData.phone || ""}
                                            onChange={handleInputChange}
                                            type="text"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">Date of birth</p>
                                        <input
                                            required
                                            value={userData.birth_date || ""}
                                            onChange={handleInputChange}
                                            type="date"
                                            name="birth_date"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">City</p>
                                        <input
                                            required
                                            value={userData.city || ""}
                                            onChange={handleInputChange}
                                            name="city"
                                            type="text"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">Zip Code</p>
                                        <input
                                            required
                                            value={userData.zip_code || ""}
                                            onChange={handleInputChange}
                                            name="zip_code"
                                            type="text"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">State</p>
                                        <input
                                            required
                                            value={userData.state || ""}
                                            onChange={handleInputChange}
                                            name="state"
                                            type="text"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">Country</p>
                                        <input
                                            required
                                            value={userData.country || ""}
                                            onChange={handleInputChange}
                                            name="country"
                                            type="text"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="">
                                        <p className="mb-1">Address</p>
                                        <textarea
                                            required
                                            value={userData.address || ""}
                                            onChange={handleInputChange}
                                            name="address"
                                            type="text"
                                            className="flex justify-start w-full h-24 p-4 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="col-span-6 py-3 mt-8 rounded-md bg-primary text-secondary"
                                >
                                    Update Details
                                </button>
                            </form>
                        </section>
                    </>
                )}
            </Container>
            <Modal modalContent={modalContent} />
        </div>
    );
};

export default UsersDetails;
