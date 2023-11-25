import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Toast from "../../utils/toast";
import Container from "../../components/share/ui/Container";
import TableHeader from "../../components/share/ui/TableHeader";
import { userLogout } from "../../redux/features/auth/authSlice";
import {
    useGetUsersDetailsMutation,
    useUpdateAcademicDetailsMutation,
} from "../../redux/features/users/usersApi";
import ImageUploader from "../../components/Modals/modalComponents/ImageUploader";

const AcademicDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { errorToast } = Toast();
    const { details } = useSelector((state) => state.users);
    const [getUsersDetails, { isError, isLoading, error }] =
        useGetUsersDetailsMutation();
    const [image, setImage] = useState("");
    const [updateAcademicDetails] = useUpdateAcademicDetailsMutation();
    const [contactDetails, setContactDetails] = useState({
        last_degree: "",
        degree_img: "",
    });

    useEffect(() => {
        if (id) {
            getUsersDetails(decodeURIComponent(id));
        }
    }, [id]);

    useEffect(() => {
        if (details) {
            setContactDetails({ ...details.academic_details });
            setImage(contactDetails.degree_img);
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
        const formData = new FormData();
        Object.keys(contactDetails).forEach((key) => {
            if (key !== "degree_img") {
                formData.append(key, contactDetails[key]);
            }
        });
        formData.append("degree_img", image);
        formData.append("employee_id", id);
        await updateAcademicDetails(formData);
    };

    const forceLogout = () => {
        localStorage.removeItem("auth");
        dispatch(userLogout(undefined));
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="flex items-center justify-between px-4 md:px-8">
                <div className="-ml-4 md:-ml-8">
                    <TableHeader title={"Academic Details"} />
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
                                    Employee Academic Details
                                </p>
                                <div className="flex items-center gap-2"></div>
                            </div>
                            <form
                                onSubmit={handleFormSubmit}
                                className="my-8 grid grid-cols-6 gap-4"
                            >
                                <div className="col-span-12 md:col-span-12">
                                    <div className="">
                                        <p className="mb-1">Last Degree</p>
                                        <input
                                            value={contactDetails.last_degree}
                                            onChange={handleInputChange}
                                            required
                                            name="last_degree"
                                            type="text"
                                            className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-12">
                                    <div className="">
                                        <p className="mb-1">Degree image</p>
                                        <ImageUploader
                                            onImageChange={(newImage) =>
                                                setImage(newImage)
                                            }
                                            initialImage={
                                                contactDetails?.degree_img ||
                                                image
                                            }
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="col-span-12 py-3 mt-8 rounded-md bg-primary text-secondary"
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

export default AcademicDetails;
