import React from "react";
import ActiveRoute from "../utils/ActiveRoute";
import { SidebarData } from "../Assets/locales/Sidebar";
import { useSidebarContext } from "../context/SidebarProvider";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer, setDropdown } from "../redux/features/utils/utilsSlice";

const Sidebar = () => {
    const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
    return (
        <>
            {isSmallOpen && (
                <div
                    onClick={close}
                    className="lg:hidden fixed inset-0 z-[999] bg-black bg-opacity-50  backdrop-blur-sm"
                />
            )}
            <aside
                className={` w-56 bg-primary h-screen lg:sticky absolute top-0 overflow-y-auto scrollbar-hide  flex-col  ${
                    isLargeOpen ? "lg:flex" : "lg:hidden"
                } ${isSmallOpen ? "flex z-[999]" : "hidden"}`}
            >
                <div className="sticky top-0 px-2 z-[50]">
                    <div className="flex flex-col items-center justify-center h-20">
                        <div className="flex gap-2 mr-6">
                            <h2 className="pt-3 text-2xl font-bold text-center text-white ">
                                EMS App.
                            </h2>
                        </div>
                    </div>
                    <ul className="mt-6">
                        {SidebarData?.map((data) => {
                            return <Items data={data} key={Math.random()} />;
                        })}
                    </ul>
                </div>
            </aside>
        </>
    );
};
export default Sidebar;

const Items = ({ data }) => {
    const location = useLocation();
    const { drawer } = useSelector((state) => state.utils);
    const dispatch = useDispatch();

    return (
        <li className="pb-2 rounded-r pt-3 text-sm leading-3 tracking-normal text-[#A1A1A1]  focus:outline-none ">
            <h1
                className={`pb-4 font-inter text-md font-medium text-[#A1A1A1] `}
            >
                {data?.title}
            </h1>
            {data?.mainMenus?.map((data) => {
                return data?.submenu?.length > 0 ? (
                    <MainItems data={data} key={Math.random()} />
                ) : (
                    <Link
                        key={data?.id}
                        onClick={() => {
                            drawer && dispatch(openDrawer(!drawer));
                            dispatch(setDropdown(null));
                        }}
                        to={data?.url}
                        className={`group mb-3 pl-2 flex items-center rounded border-0 border-green-500 transition-all  hover:border-l-4  focus:border-l-4  ${
                            data.url === location.pathname &&
                            " border-l-4 pl-2 bg-white bg-opacity-10 text-white "
                        }`}
                    >
                        <div className="flex items-center ">
                            <span className=""> {data?.icon}</span>
                            <span className="pl-2 text-base font-semibold font-inter">
                                {data?.name}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </li>
    );
};

const MainItems = ({ data }) => {
    const dispatch = useDispatch();
    const isActive = ActiveRoute(location);
    const { dropdown } = useSelector((state) => state.utils);
    const { close, isSmallOpen } = useSidebarContext();
    return (
        <>
            <div className="py-3"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div
                    onClick={() => {
                        localStorage.getItem("dropdown") === data?.name
                            ? (dispatch(setDropdown(null)),
                              localStorage.removeItem("dropdown"))
                            : (localStorage.setItem("dropdown", data?.name),
                              dispatch(setDropdown(data?.name)));
                    }}
                    className={`group mb-4 flex items-center justify-between rounded border-0  px-2 border-green-600 group-hover:text-white focus:text-white active:text-white transition-all hover:border-l-3 focus:border-l-3 active:border-l-3  ${
                        isActive &&
                        dropdown === data?.name &&
                        " border-l-4 pl-1 py-1 bg-opacity-10  "
                    }   `}
                >
                    <div className="flex items-center cursor-pointer">
                        <span className="pr-2"> {data?.icon} </span>
                        <p
                            className={`pl-0 font-inter  font-semibold group-hover:text-white focus:text-white active:text-white text-sm  ${
                                isActive &&
                                dropdown === data?.name &&
                                "text-white"
                            }`}
                        >
                            {" "}
                            {data?.name}{" "}
                        </p>
                    </div>
                    <div>
                        {dropdown === data?.name ? (
                            <div className="ml-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-chevron-up group-hover:stroke-white active:stroke-white"
                                    width={14}
                                    height={14}
                                    viewBox="0 0 24 24"
                                    strokeWidth={1}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <polyline points="6 15 12 9 18 15" />
                                </svg>
                            </div>
                        ) : (
                            <div className="ml-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-chevron-down group-hover:stroke-white active:stroke-white"
                                    width={14}
                                    height={14}
                                    viewBox="0 0 24 24"
                                    strokeWidth={1}
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                    />
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
                {dropdown === data?.name && (
                    <div
                        onClick={() => {
                            dispatch(setDropdown(data?.name));
                        }}
                        className="ml-6 transition-all"
                    >
                        <ul className="my-3">
                            {data?.submenu?.map((data) => {
                                return (
                                    <li key={data?.id} className="w-full my-2">
                                        <Link
                                            onClick={() => {
                                                isSmallOpen && close();
                                                setDropdown(data?.name);
                                            }}
                                            to={data?.url}
                                        >
                                            <span
                                                className={`flex items-center ${
                                                    data.url ===
                                                        location.pathname &&
                                                    " border-l-4  bg-white text-white bg-opacity-10  "
                                                }`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 25"
                                                    fill="none"
                                                >
                                                    <rect
                                                        x="7.06066"
                                                        y="12.7227"
                                                        width="6.5"
                                                        height="6.5"
                                                        rx="1.25"
                                                        transform="rotate(-45 7.06066 12.7227)"
                                                        stroke="white"
                                                        strokeWidth="1.5"
                                                    />
                                                </svg>
                                                <p
                                                    className={`rounded px-1 font-inter text-base font-semibold  hover:text-white focus:text-white  active:text-white `}
                                                >
                                                    {data?.name}
                                                </p>
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};
