import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import Toast from "../../utils/toast";
import Container from "../../components/share/ui/Container";
import TableHeader from "../../components/share/ui/TableHeader";
import {
    useCreateSalaryPayoutMutation,
    useGetUsersDropdownMutation,
} from "../../redux/features/users/usersApi";

const CreateSalaryPayout = () => {
    const navigate = useNavigate();
    const { errorToast } = Toast();
    const { data } = useSelector((state) => state.users);

    const [getUsersDropdown, { isError, isLoading, error }] =
        useGetUsersDropdownMutation();
    const [createSalaryPayout] = useCreateSalaryPayoutMutation();

    const [salaryData, setSalaryData] = useState({
        employee_id: "",
        month: new Date(),
        amount: "",
    });

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
        setSalaryData({ ...salaryData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setSalaryData({ ...salaryData, month: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = `${
            salaryData.month.getMonth() + 1
        }-${salaryData.month.getFullYear()}`;
        const payload = {
            employee_id: salaryData.employee_id,
            month: formattedDate,
            amount: salaryData.amount,
        };
        try {
            await createSalaryPayout(payload);
            navigate("/payouts");
        } catch (error) {
            // Handle error
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
                    <TableHeader title={"Create Salary Payout"} />
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
                            {/* Employee Dropdown */}
                            <div className="col-span-6">
                                <p className="mb-1">Employee ID</p>

                                <select
                                    name="employee_id"
                                    value={salaryData.employee_id}
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
                            {/* Month Picker */}
                            <div className="col-span-6">
                                <p className="mb-1">Salary Month</p>
                                <DatePicker
                                    selected={salaryData.month}
                                    onChange={handleDateChange}
                                    dateFormat="MM-yyyy"
                                    showMonthYearPicker
                                    className="w-full px-2 py-2 border rounded-md focus:outline-none"
                                />
                            </div>
                            {/* Amount Input */}
                            <div className="col-span-6">
                                <p className="mb-1">Salary Amount</p>

                                <input
                                    name="amount"
                                    type="number"
                                    value={salaryData.amount}
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
                            Create Salary Payout
                        </button>
                    </form>
                )}
            </Container>
        </div>
    );
};

export default CreateSalaryPayout;
