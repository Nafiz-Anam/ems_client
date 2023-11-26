import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Toast from "../../utils/toast";
import Container from "../../components/share/ui/Container";
import TableHeader from "../../components/share/ui/TableHeader";
import {
    useCreateBankMutation,
    useGetUsersDropdownMutation,
} from "../../redux/features/users/usersApi";
import { useSelector } from "react-redux";

const CreateBank = () => {
    const navigate = useNavigate();
    const { errorToast } = Toast();
    const { data } = useSelector((state) => state.users);

    const [payoutData, setPayoutData] = useState({
        employee_id: "",
        bank_name: "",
        account_holder: "",
        account_number: "",
        bank_branch: "",
        bank_swift_code: "",
    });

    const [createBank] = useCreateBankMutation();
    const [getUsersDropdown, { isError, isLoading, error }] =
        useGetUsersDropdownMutation();

    const [employees, setEmployees] = useState(data);
    const loadDataFn = async () => {
        const data = await getUsersDropdown();
        console.log(data);
        setEmployees(data?.data?.data);
    };

    useEffect(() => {
        loadDataFn();
    }, []);

    const handleInputChange = (e) => {
        setPayoutData({ ...payoutData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBank(payoutData);
            navigate("/employees/bank_accounts");
        } catch (error) {
            // Error handling logic here
        }
    };

    useEffect(() => {
        if (isError) {
            errorToast(error?.data?.error || "Internal server error");
        }
    }, [isError, error]);

    return (
        <div className="min-h-screen bg-white">
            <div className="flex items-center justify-between px-4 md:px-8">
                <div className="-ml-4 md:-ml-8">
                    <TableHeader title={"Add Bank Details"} />
                </div>
            </div>
            <Container>
                {isLoading ? (
                    <div className="flex flex-col mt-10">
                        <span className="loading loading-bars loading-md"></span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="my-8">
                        <div className="grid grid-cols-6 gap-4 mt-6">
                            {/* Employee ID Input */}
                            <p className="mb-1">Employee ID</p>
                            <div className="col-span-6">
                                <select
                                    name="employee_id"
                                    value={payoutData.employee_id}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                >
                                    <option value="">Select Employee</option>
                                    {employees &&
                                        employees.map((employee) => (
                                            <option
                                                key={employee.id}
                                                value={employee.id}
                                            >
                                                {employee.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            {/* Bank Name Input */}
                            <div className="col-span-6">
                                <p className="mb-1">Bank Name</p>
                                <input
                                    name="bank_name"
                                    type="text"
                                    value={payoutData.bank_name}
                                    onChange={handleInputChange}
                                    className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                    required
                                />
                            </div>
                            {/* Account Holder Input */}
                            <div className="col-span-6">
                                <p className="mb-1">Account Holder</p>
                                <input
                                    name="account_holder"
                                    type="text"
                                    value={payoutData.account_holder}
                                    onChange={handleInputChange}
                                    className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                    required
                                />
                            </div>
                            {/* Account Number Input */}
                            <div className="col-span-6">
                                <p className="mb-1">Account Number</p>

                                <input
                                    name="account_number"
                                    type="text"
                                    value={payoutData.account_number}
                                    onChange={handleInputChange}
                                    className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                    required
                                />
                            </div>
                            {/* Bank Branch Input */}
                            <div className="col-span-6">
                                <p className="mb-1">Bank Branch</p>

                                <input
                                    name="bank_branch"
                                    type="text"
                                    value={payoutData.bank_branch}
                                    onChange={handleInputChange}
                                    className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                    required
                                />
                            </div>
                            {/* Bank Swift Code Input */}
                            <div className="col-span-6">
                                <p className="mb-1">Bank Swift Code</p>

                                <input
                                    name="bank_swift_code"
                                    type="text"
                                    value={payoutData.bank_swift_code}
                                    onChange={handleInputChange}
                                    className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="py-3 px-5 mt-8 rounded-md bg-primary text-secondary"
                        >
                            Add Bank
                        </button>
                    </form>
                )}
            </Container>
        </div>
    );
};

export default CreateBank;
