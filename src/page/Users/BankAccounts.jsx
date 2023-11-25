import React, { useEffect, useState } from "react";
import TableTemp from "../../components/share/ui/TableTemp";
import Container from "../../components/share/ui/Container";
import TableHeader from "../../components/share/ui/TableHeader";
import { useGetBanksMutation } from "../../redux/features/users/usersApi";
import { useParams } from "react-router-dom";
import StageLoading from "../../components/share/loading/StageLoading";

const BankAccounts = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const deId = decodeURIComponent(id);
    const tableHeader = [
        { name: "Employee Name", field: "employee_name" },
        { name: "Bank Name", field: "bank_name" },
        { name: "Account Holder", field: "account_holder" },
        { name: "Account Number", field: "account_number" },
        { name: "Bank Branch", field: "bank_branch" },
        { name: "Swift Code", field: "bank_swift_code" },
    ];
    const fieldToShow = [
        "employee_name",
        "bank_name",
        "account_holder",
        "account_number",
        "bank_branch",
        "bank_swift_code",
    ];
    const [getBanks, { isError, isLoading, isSuccess }] = useGetBanksMutation();
    const loadDataFn = async () => {
        const response = await getBanks(deId);
        setData(response);
    };

    useEffect(() => {
        loadDataFn();
    }, []);

    return (
        <div className="">
            <TableHeader title={"Bank Accounts"} />
            <Container>
                <div className="md:flex mb-[37px] mt-[30px] items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <p className="mb-2 text-xl font-bold">Bank Accounts</p>
                    </div>
                </div>
                <div className="mb-8 overflow-x-scroll scrollbar-hide">
                    <StageLoading
                        isError={isError}
                        isLoading={isLoading}
                        isSuccess={isSuccess}
                        data={data}
                    >
                        <TableTemp
                            btn={false}
                            customIdFieldName="employee_id"
                            linkUrl="/employees/details"
                            customID={true}
                            linkOnly={true}
                            linkFieldName="employee_name"
                            isImage={false}
                            isImageLink={false}
                            tableHead={tableHeader}
                            data={data?.data?.data}
                            fieldsToShow={fieldToShow}
                        />
                    </StageLoading>
                </div>
            </Container>
        </div>
    );
};

export default BankAccounts;
