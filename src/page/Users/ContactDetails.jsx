import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Toast from "../../utils/toast";
import Container from "../../components/share/ui/Container";
import TableHeader from "../../components/share/ui/TableHeader";
import { userLogout } from "../../redux/features/auth/authSlice";
import {
    useGetUsersDetailsMutation,
    useUpdateContactDetailsMutation,
} from "../../redux/features/users/usersApi";

const ContactDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { errorToast } = Toast();
    const { details } = useSelector((state) => state.users);
    const [getUsersDetails, { isError, isLoading, error }] =
        useGetUsersDetailsMutation();

    const [updateContactDetails] = useUpdateContactDetailsMutation();
    const [contactDetails, setContactDetails] = useState({
        contact_person1_name: "",
        contact_person1_phone: "",
        contact_person1_relation: "",
        contact_person2_name: "",
        contact_person2_phone: "",
        contact_person2_relation: "",
    });

    useEffect(() => {
        if (id) {
            getUsersDetails(decodeURIComponent(id));
        }
    }, [id]);

    useEffect(() => {
        if (details) {
            setContactDetails({ ...details.contact_details });
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
        setContactDetails({
            ...contactDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await updateContactDetails({ employee_id: id, ...contactDetails });
    };

    const forceLogout = () => {
        localStorage.removeItem("auth");
        dispatch(userLogout(undefined));
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="flex items-center justify-between px-4 md:px-8">
                <div className="-ml-4 md:-ml-8">
                    <TableHeader title={"Contact Details"} />
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
                        {/* User Information input */}
                        <section className="my-8">
                            <div className="flex justify-between item-center">
                                <p className="text-xl font-bold capitalize">
                                    Employee Contact Persons
                                </p>
                                <div className="flex items-center gap-2"></div>
                            </div>
                            <form
                                onSubmit={handleFormSubmit}
                                className="my-8 grid grid-cols-6 gap-4"
                            >
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">
                                            Contact Person One Name
                                        </p>
                                        <input
                                            value={
                                                contactDetails.contact_person1_name
                                            }
                                            onChange={handleInputChange}
                                            required
                                            name="contact_person1_name"
                                            type="text"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">
                                            Contact Person One Phone
                                        </p>
                                        <input
                                            required
                                            name="contact_person1_phone"
                                            value={
                                                contactDetails.contact_person1_phone
                                            }
                                            onChange={handleInputChange}
                                            type="text"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">
                                            Contact Person One Relation
                                        </p>
                                        <input
                                            required
                                            value={
                                                contactDetails.contact_person1_relation
                                            }
                                            onChange={handleInputChange}
                                            type="text"
                                            name="contact_person1_relation"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3"></div>

                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">
                                            Contact Person Two Name
                                        </p>
                                        <input
                                            value={
                                                contactDetails.contact_person2_name
                                            }
                                            onChange={handleInputChange}
                                            required
                                            name="contact_person2_name"
                                            type="text"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">
                                            Contact Person Two Phone
                                        </p>
                                        <input
                                            required
                                            name="contact_person2_phone"
                                            value={
                                                contactDetails.contact_person2_phone
                                            }
                                            onChange={handleInputChange}
                                            type="text"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <div className="">
                                        <p className="mb-1">
                                            Contact Person Two Relation
                                        </p>
                                        <input
                                            required
                                            value={
                                                contactDetails.contact_person2_relation
                                            }
                                            onChange={handleInputChange}
                                            type="text"
                                            name="contact_person2_relation"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 md:col-span-3"></div>

                                <button
                                    type="submit"
                                    className="col-span-6 py-3 mt-8 rounded-md bg-primary text-secondary"
                                >
                                    Update
                                </button>
                            </form>
                        </section>
                    </>
                )}
            </Container>
        </div>
    );
};

export default ContactDetails;
