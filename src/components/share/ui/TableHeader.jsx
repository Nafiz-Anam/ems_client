import React from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";

const TableHeader = ({ title, button_title, link }) => {
    return (
        <div className="flex justify-between w-full px-4 py-8 mx-auto bg-white md:px-8 ">
            <div>
                <h1 className="font-bold lg:text-2xl">{title}</h1>
                <Breadcrumb />
            </div>
            {button_title ? (
                <Link
                    to={link}
                    className="flex items-center justify-center gap-2 py-6 cursor-pointer"
                >
                    <div>
                        <button className="px-3 py-2 rounded-md bg-primary text-secondary">
                            {button_title}
                        </button>
                    </div>
                </Link>
            ) : (
                ""
            )}
        </div>
    );
};

export default TableHeader;
