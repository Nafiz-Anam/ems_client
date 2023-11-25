import React from "react";
import Chart from "../components/chart/Chart";
import Cards from "../components/dashboard/Cards";
import Container from "../components/share/ui/Container";
import { Options } from "../components/share/ui/Dropdown";
import TableHeader from "../components/share/ui/TableHeader";
import { BagIcon, LoadingIcon, WalletIcon } from "../Assets/icons";

const Home = () => {
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
                value: 15,
                bg: "bg-[#AA72EB]",
                icon: <BagIcon />,
            },
            {
                name: "Total Active Employees",
                value: 13,
                bg: "bg-[#1DCBA8]",
                icon: <BagIcon />,
            },
            {
                name: "New Employees",
                value: 13,
                url: "add later ",
                bg: "bg-[#FFAF3D]",
                icon: <LoadingIcon />,
            },
            {
                name: "Total Tasks",
                value: 13,
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
                <Chart />
            </Container>
        </div>
    );
};

export default Home;
