import React from "react";
import OneLineGraph from "./OnelineGraph";

const Chart = (data) => {
    return (
        <div className="gap-4 pt-4 pb-10 lg:flex ">
            <div className="bg-white shadow-cardShadow rounded-[16px] pb-[10px] pt-5 lg:w-[100%] ">
                <div className="mb-5 pl-[29px]">
                    <h1 className="text-[18px] font-poppins text-black">
                        Monthly Revenue
                    </h1>
                    <div className="flex items-end gap-1">
                        <p className="text-2xl font-bold"> $ 5,85,000</p>
                    </div>
                </div>
                <OneLineGraph data={data} />
            </div>
        </div>
    );
};

export default Chart;
