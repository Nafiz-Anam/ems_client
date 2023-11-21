import React, { useState } from 'react';
import { UsFlagIcon } from "../Assets/locales/DashboardIcons";
import { DrawerButton } from '../components/share/buttons/Buttons';
import Search from '../components/share/search/Search';
import { useSidebarContext } from '../context/SidebarProvider';
import { Logout } from '../components/share/logout/Logout';

const TopNav = () => {
  const [profile, setProfile] = useState(false);
  const { toggle } = useSidebarContext();

  return (
    <nav
      className={`flex h-16 items-center justify-end bg-secondary shadow lg:h-24 lg:items-stretch lg:justify-between w-full   px-4`}>
      <div className="items-center hidden w-full px-4 lg:flex ">
        <Search />
        <div className="justify-end hidden w-full max-w-xs gap-4 lg:flex">
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center justify-start gap-3.5">
              <UsFlagIcon />
              <select
                className="pr-2 bg-transparent focus:outline-none"
                name=""
                id="">
                <option
                  className="text-lg font-semibold text-slate-700"
                  value="Eng(US)">
                  Eng (US)
                </option>
                <div className=""></div>
              </select>
            </div>
            <div
              className="relative flex items-center cursor-pointer"
              onClick={() => setProfile(!profile)}>
              <div className="rounded-full">
                {profile ? (
                  <ul className="absolute left-0 w-full p-2 mt-12 bg-white border-r rounded shadow sm:mt-16 ">
                    <li className="flex w-full text-gray-600 cursor-pointer hover:text-indigo-700">
                      <Logout>
                        <div className="flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-logout"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                            <path d="M7 12h14l-3 -3m0 6l3 -3" />
                          </svg>
                          <span
                            className="ml-2 text-sm">
                            Sign out
                          </span>
                        </div>
                      </Logout>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
                <div className="relative">
                  <img
                    className="object-cover w-10 h-10 rounded-md"
                    src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                    alt="avatar"
                  />
                  {/* <div className="absolute inset-0 w-2 h-2 m-auto mb-0 mr-0 bg-green-400 border border-white rounded-full" /> */}
                </div>
              </div>
              <div className="ml-3 mr-6">
                <p className="font-poppins text-base font-medium text-[#151D48]">
                  {/* {authInfo?.user?.username} */}
                </p>
                <p className="font-regular font-poppins text-sm text-[#737791]">
                  Admin
                </p>
                <div className="">

                </div>

              </div>
              <div className="text-gray-600 cursor-pointer">
                <svg
                  aria-haspopup="true"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-down"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  Mobile View */}
      <div className="relative visible w-full px-4 text-gray-600 lg:hidden"
      >
        <div className="flex items-center justify-between w-full">
          <h1>Logo</h1>
          <div
            onClick={toggle}
            className="">
            <DrawerButton />
          </div>
        </div>

      </div>
    </nav>
  );
};

export default TopNav;