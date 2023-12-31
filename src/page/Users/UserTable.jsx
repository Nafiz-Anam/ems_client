import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Search from "../../components/share/search/Search";
import TableTemp from "../../components/share/ui/TableTemp";
import Container from "../../components/share/ui/Container";
import TableHeader from "../../components/share/ui/TableHeader";
import Paginate from "../../components/share/Paginate/Paginate";
import StageLoading from "../../components/share/loading/StageLoading";
import { useGetUsersMutation } from "../../redux/features/users/usersApi";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState();
    const [rightPage, setRightPage] = useState(1);
    const [paginateData, setPaginateData] = useState([]);

    const { data } = useSelector((state) => state.users);
    const [getUsers, { isError, isLoading, isSuccess, error }] =
        useGetUsersMutation();

    const loadDataFn = async (page) => {
        if (search?.client) {
            setRightPage(1);
        }
        const data = await getUsers({
            page,
            deleted: 0,
            search: search?.client,
        });
        setPaginateData(data);
    };
    useEffect(() => {
        loadDataFn(rightPage);
    }, [search]);

    const handlePageClick = (data) => {
        let selected = data.selected;
        if (selected === 0) return loadDataFn(1);
        loadDataFn(selected + 1);
        setRightPage(selected + 1);
    };

    const tableHead = [
        { name: "Image", field: "profile_img" },
        { name: "Employee Name", field: "name" },
        { name: "Phone ", field: "phone" },
        { name: "Email", field: "email" },
        { name: "Gender ", field: "gender" },
        { name: "Joined", field: "created_at" },
        { name: "status", field: "status" },
    ];
    const fieldsToShow = [
        "profile_img",
        "name",
        "phone",
        "email",
        "gender",
        "created_at",
        "status",
    ];

    const token = localStorage.getItem("auth");

    const reportFn = (data) => {
        fetch(`http://localhost:5000/api/v1/dashboard/generate-report`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ employee_id: data.id }),
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `employee-report-${data.name}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch((error) => console.error("Error:", error));
    };

    const deleteFn = (data) => {
        fetch(`http://localhost:5000/api/v1/employee/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(token).accessToken}`,
            },
            body: JSON.stringify({ employee_id: data.id }),
        })
            .then((response) => {
                console.log(response);
                navigate("/employees");
            })
            .catch((error) => console.error("Error:", error));
    };

    const ActionData = [
        { name: "Generate Report", fn: reportFn },
        { name: "Delete", fn: deleteFn },
    ];

    return (
        <div className="bg-secondary">
            <TableHeader
                title={"All Employees"}
                button_title="Create Employee"
                link="/employees/create"
            />
            <Container>
                <div className="md:flex mb-[37px] mt-[30px] items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <p className="mb-2 text-xl font-bold">All Employees</p>
                    </div>
                    <div className="flex flex-row items-end w-full md:max-w-md md:flex-col ">
                        <div className="flex flex-col items-center w-full max-w-sm gap-2 md:flex-row ">
                            <Search
                                setSearch={setSearch}
                                text={"username or email or phone"}
                                name={"client"}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-8 overflow-x-scroll scrollbar-hide">
                    <StageLoading
                        isLoading={isLoading}
                        isError={isError}
                        isSuccess={isSuccess}
                        error={error}
                    >
                        <TableTemp
                            rightPage={rightPage}
                            btn={true}
                            linkUrl="/employees/details"
                            customID={true}
                            assignLinkOnHeader="profile_img"
                            linkOnly={true}
                            linkFieldName="name"
                            isImage={true}
                            isImageLink={false}
                            tableHead={tableHead}
                            data={data}
                            fieldsToShow={fieldsToShow}
                            actionData={ActionData}
                        />
                    </StageLoading>
                </div>
            </Container>
            {!isError && (
                <Paginate loadDataFn={handlePageClick} total={paginateData} />
            )}
        </div>
    );
};

export default UserTable;
