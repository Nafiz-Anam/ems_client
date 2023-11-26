import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Toast from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import Container from "../../components/share/ui/Container";
import TableHeader from "../../components/share/ui/TableHeader";
import { userLogout } from "../../redux/features/auth/authSlice";
import { useCreateEmployeeMutation } from "../../redux/features/users/usersApi";
import ImageUploader from "../../components/Modals/modalComponents/ImageUploader";

const CreateEmployee = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { errorToast } = Toast();
    const [createEmployee, { isError, isLoading, error }] =
        useCreateEmployeeMutation();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        birth_date: "",
        city: "",
        zip_code: "",
        state: "",
        country: "",
        address: "",
        bank_name: "",
        account_holder: "",
        account_number: "",
        bank_branch: "",
        bank_swift_code: "",
        contact_person1_name: "",
        contact_person1_phone: "",
        contact_person1_relation: "",
        contact_person2_name: "",
        contact_person2_phone: "",
        contact_person2_relation: "",
        id_type: "",
        id_img1: null,
        id_img2: null,
        profile_img: null,
    });

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const handleImageChange1 = (newImage) => {
        setImage(newImage);
    };

    const handleImageChange2 = (newImage) => {
        setImage2(newImage);
    };

    const handleImageChange3 = (newImage) => {
        setImage3(newImage);
    };

    const handleImageChange4 = (newImage) => {
        setImage4(newImage);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(userData).forEach((key) => {
            if (
                !["id_img1", "id_img2", "profile_img", "degree_img"].includes(
                    key
                )
            ) {
                formData.append(key, userData[key]);
            }
        });

        if (image) formData.append("id_img1", image);
        if (image2) formData.append("id_img2", image2);
        if (image3) formData.append("profile_img", image3);
        if (image4) formData.append("degree_img", image4);

        try {
            await createEmployee(formData);
            navigate("/employees");
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        if (isError) {
            errorToast(error?.data?.error || "Internal server error");
            if (error?.data?.error === "Token Expired Please Login.") {
                forceLogout();
            }
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
                        {/* User Information input */}
                        <section className="my-8">
                            <form onSubmit={handleSubmit}>
                                <section>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                                        <div className="col-span-1 md:col-span-8">
                                            <p className="mb-1">
                                                Profile Image
                                            </p>
                                            <ImageUploader
                                                onImageChange={
                                                    handleImageChange1
                                                }
                                            />
                                        </div>
                                        <div className="col-span-1 bg-white flex m-auto md:col-span-4"></div>
                                    </div>
                                </section>
                                <div className="flex justify-between item-center  mt-5">
                                    <p className="text-xl font-bold capitalize">
                                        Personal Information
                                    </p>
                                    <div className="flex items-center gap-2"></div>
                                </div>
                                <section className="grid grid-cols-6 gap-4 mt-6">
                                    <div className="col-span-6 md:col-span-3">
                                        <div className="">
                                            <p className="mb-1">Name</p>
                                            <input
                                                value={userData.name}
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
                                            <p className="mb-1">
                                                Email address
                                            </p>
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
                                            <p className="mb-1">
                                                Date of birth
                                            </p>
                                            <input
                                                required
                                                value={
                                                    userData.birth_date || ""
                                                }
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
                                </section>

                                <div className="flex justify-between item-center mt-5">
                                    <p className="text-xl font-bold capitalize">
                                        KYC Information
                                    </p>
                                    <div className="flex items-center gap-2"></div>
                                </div>
                                <section className="grid grid-cols-6 gap-4 mt-6">
                                    <div className="col-span-12 md:col-span-12">
                                        <div className="">
                                            <p className="mb-1">ID Type</p>
                                            <input
                                                value={userData.id_type}
                                                onChange={handleInputChange}
                                                required
                                                name="id_type"
                                                type="text"
                                                className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-12">
                                        <div className="">
                                            <p className="mb-1">
                                                ID front image
                                            </p>
                                            <ImageUploader
                                                onImageChange={
                                                    handleImageChange2
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-12">
                                        <div className="">
                                            <p className="mb-1">
                                                ID Back Image
                                            </p>
                                            <ImageUploader
                                                onImageChange={
                                                    handleImageChange3
                                                }
                                            />
                                        </div>
                                    </div>
                                </section>

                                <div className="flex justify-between item-center mt-5">
                                    <p className="text-xl font-bold capitalize">
                                        Academic Information
                                    </p>
                                    <div className="flex items-center gap-2"></div>
                                </div>
                                <section className="grid grid-cols-6 gap-4 mt-6">
                                    <div className="col-span-12 md:col-span-12">
                                        <div className="">
                                            <p className="mb-1">Last Degree</p>
                                            <input
                                                value={userData.last_degree}
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
                                            <p className="mb-1">
                                                Degree Certificate
                                            </p>
                                            <ImageUploader
                                                onImageChange={
                                                    handleImageChange4
                                                }
                                            />
                                        </div>
                                    </div>
                                </section>

                                <div className="flex justify-between item-center mt-5">
                                    <p className="text-xl font-bold capitalize">
                                        Contact Information
                                    </p>
                                    <div className="flex items-center gap-2"></div>
                                </div>
                                <section className="grid grid-cols-6 gap-4 mt-6">
                                    <div className="col-span-6 md:col-span-3">
                                        <div className="">
                                            <p className="mb-1">
                                                Contact Person One Name
                                            </p>
                                            <input
                                                value={
                                                    userData.contact_person1_name
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
                                                    userData.contact_person1_phone
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
                                                    userData.contact_person1_relation
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
                                                    userData.contact_person2_name
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
                                                    userData.contact_person2_phone
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
                                                    userData.contact_person2_relation
                                                }
                                                onChange={handleInputChange}
                                                type="text"
                                                name="contact_person2_relation"
                                                className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-6 md:col-span-3"></div>
                                </section>

                                <div className="flex justify-between item-center mt-5">
                                    <p className="text-xl font-bold capitalize">
                                        Bank Account Information
                                    </p>
                                    <div className="flex items-center gap-2"></div>
                                </div>
                                <section className="grid grid-cols-6 gap-4 mt-6">
                                    <div className="col-span-6 md:col-span-3">
                                        <div className="">
                                            <p className="mb-1">Bank Name</p>
                                            <input
                                                required
                                                name="bank_name"
                                                value={userData.bank_name}
                                                onChange={handleInputChange}
                                                type="text"
                                                className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-6 md:col-span-3">
                                        <div className="">
                                            <p className="mb-1">
                                                Account Holder
                                            </p>
                                            <input
                                                required
                                                value={userData.account_holder}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="account_holder"
                                                className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-6 md:col-span-3">
                                        <div className="">
                                            <p className="mb-1">
                                                Account Number
                                            </p>
                                            <input
                                                required
                                                value={userData.account_number}
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
                                                value={userData.bank_branch}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="bank_branch"
                                                className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-6 md:col-span-3">
                                        <div className="">
                                            <p className="mb-1">
                                                Bank Swift_code
                                            </p>
                                            <input
                                                required
                                                value={userData.bank_swift_code}
                                                onChange={handleInputChange}
                                                type="text"
                                                name="bank_swift_code"
                                                className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </section>

                                <button
                                    type="submit"
                                    className="col-span-6 py-3 mt-8 rounded-md bg-primary text-secondary"
                                >
                                    Create Employee
                                </button>
                            </form>
                        </section>
                    </>
                )}
            </Container>
        </div>
    );
};

export default CreateEmployee;
