import React, { Fragment } from "react";
import Card from "./Card";
import CardSkeleton from "../share/CardSkeleton";

const Cards = ({ data }) => {

  return (
    <Fragment>
      <div className="">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          {data?.HeaderData?.map((headData, i) => <Card className={`${headData.bg} group hover:bg-primary hover:text-white`} data={headData} key={i} />)}
        </div>

        {/* middle section  */}
        <div className="grid grid-cols-1 gap-4 py-4 mt-2 md:grid-cols-3 md:gap-6 md:py-3 xl:grid-cols-4 lg:gap-6 ">
          {data?.UserData?.length > 0 ? (
            data?.UserData?.map((userData, i) => <Card className={"group hover:bg-primary hover:text-white"} data={userData} key={i} />)
          ) : (
            <CardSkeleton />
          )}
        </div>

        {/* end section  */}
        <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-3 md:gap-6 md:py-2 xl:grid-cols-4 lg:gap-6 2xl:grid-cols-4 ">
          {data?.EarningData?.length > 0 ? (
            data?.EarningData?.map((earnData) =>
              <>
                <Card className={`${earnData.bg} text-white group hover:bg-primary hover:text-white`} data={earnData} />
              </>
            )
          ) : (
            <CardSkeleton />
          )}
        </div>
      </div>



    </Fragment>
  );
};

export default Cards;
