import React, { useEffect, useState } from "react";
import Chart from "../components/chart/Chart";
import Cards from "../components/dashboard/Cards";
import Container from "../components/share/ui/Container";
import { Options } from "../components/share/ui/Dropdown";
import TableHeader from "../components/share/ui/TableHeader";
import { BagIcon, LoadingIcon, WalletIcon } from "../Assets/icons";
import { useSelector } from "react-redux";
import { useGetAnalyticsMutation } from "../redux/features/users/usersApi";

const Home = () => {
    const [graphData, setGraphData] = useState([]);
    const { data } = useSelector((state) => state.users);
    const [getAnalytics, { isError, isLoading, isSuccess, error }] =
        useGetAnalyticsMutation();

    const loadDataFn = async () => {
        const data = await getAnalytics();
        setGraphData(data?.data?.analytics);
    };

    useEffect(() => {
        loadDataFn();
    }, []);

    const cardData = {
        HeaderData: [
            {
                name: "Today Earning",
                value: "$100,000",
                url: "some url",
                bg: "bg-[#0eab8b] bg-opacity-20",
                icon: <WalletIcon />,
            },
            {
                name: "Net Revenue",
                value: "$100,000",
                url: "some url",
                icon: <WalletIcon />,
            },
        ],
        EarningData: [
            {
                name: "Total Employees",
                value: `${graphData.totalEmployeeCount}`,
                bg: "bg-[#AA72EB]",
                icon: <BagIcon />,
            },
            {
                name: "Total Active Employees",
                value: `${graphData.activeEmployeeCount}`,
                bg: "bg-[#1DCBA8]",
                icon: <BagIcon />,
            },
            {
                name: "New Employees",
                value: 17,
                url: "add later ",
                bg: "bg-[#FFAF3D]",
                icon: <LoadingIcon />,
            },
            {
                name: "Total Tasks",
                value: "2,99",
                bg: "bg-[#FF6A6A]",
                icon: <BagIcon />,
            },
        ],
        UserData: [
            {
                name: "Total Tasks Post",
                value: "580",
                url: "some url",
                icon: <BagIcon />,
            },
            {
                name: "Complete Tasks",
                value: "450",
                url: "some url",
                icon: <BagIcon />,
            },
            {
                name: "Complete Payment",
                value: "$2,320",
                url: "some url",
                icon: <WalletIcon />,
            },
            {
                name: "Pending Payment",
                value: "$412",
                url: "some url",
                icon: <WalletIcon />,
            },
        ],
    };

    return (
        <>
            {isLoading ? (
                <div className="flex flex-col mt-10">
                    <span className="loading loading-bars loading-md"></span>
                </div>
            ) : (
                <div className="bg-white">
                    <div className="flex items-center justify-between px-4 md:px-8">
                        <div className="-ml-4 md:-ml-8">
                            <TableHeader title={"Dashboard"} />
                        </div>
                        <div className="">
                            <Options
                                options={[
                                    "Daily",
                                    "Weekly",
                                    "Monthly",
                                    "Yearly",
                                    "Life Time",
                                ]}
                            />
                        </div>
                    </div>
                    <Container>
                        <p className="mb-5 text-xl font-bold capitalize">
                            You are viewing life time Data
                        </p>
                        <Cards data={cardData} />
                        <Chart data={graphData} />
                    </Container>
                </div>
            )}
        </>
    );
};

export default Home;
