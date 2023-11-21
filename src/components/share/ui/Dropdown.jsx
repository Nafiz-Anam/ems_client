import React from 'react';
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from 'tailwind-merge';

export const TableActionDropdown = ({ data, actionData, }) => {
  return (
    <div className={`relative w-full h-full `}>
      <div className="dropdown dropdown-left">
        <label tabIndex={0} className="flex items-center justify-center text-2xl cursor-pointer">
          ...
        </label>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 -mt-10">
          {actionData?.map((item, i) => (
            <li key={i}>
              <a
                onClick={() => item?.fn(data)}
                className="flex items-center gap-2">
                {/* {item.icon} */}
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const SharedDropdown = ({ label, options, setDropdownValues, value }) => {
  const [operatorOption, setOperatorOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const inputRef = useRef(null);
  const ulRef = useRef(null);
  const keyName = label.replace("_", " ");
  const handleSelectChange = (text) => {
    setSelectedOption(text);
    setOperatorOption(false);
  };
  const handleInputBlur = () => {
    if (selectedOption === "") {
      setOperatorOption(true);
    }
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        ulRef.current &&
        !ulRef.current.contains(e.target)
      ) {
        setOperatorOption(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    const handleDropdownValueChange = (name, value) => {
      setDropdownValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
    handleDropdownValueChange(label, selectedOption ? selectedOption : "");
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [selectedOption]);
  return (
    <div className="">
      <label className="text-base font-normal capitalize font-montserrat" >
        <span className="font-medium text-primary"></span> {keyName}
      </label>
      <div className="relative mt-1 text-base font-montserrat">
        <div ref={inputRef}
          onClick={() => setOperatorOption(!operatorOption)}
          onBlur={handleInputBlur}
          className="flex items-center justify-between gap-2 p-2 border rounded-md cursor-pointer">
          <p className="font-normal capitalize select-none font-montserrat">
            {selectedOption === '' && selectedOption !== value ? value : selectedOption}
          </p>
          <span className={`${operatorOption ? "rotate-180" : "rotate-0"} duration-300 text-gray-500`} >
            <IoIosArrowDown size={17} />
          </span>
        </div>
        <ul ref={ulRef}
          className={`bg-white absolute left-0 z-50 bg-secondBackground right-0 p-3 px-3 font-normal font-montserrat rounded-md  shadow-md mt-1 gap-y-[6px] flex flex-col ${operatorOption ? "block" : "hidden"}`} >
          {options?.map((name, index) => (
            <li className=" select-none rounded-md capitalize py-[5px] px-2 cursor-pointer hover:bg-gray-400 hover:text-white" key={index}
              onClick={() => handleSelectChange(name)}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Options = ({ options, setOptionValue, className, optionValue }) => {
  return (
    <div className="p-2 border rounded-md">
      <select onChange={(e) => setOptionValue(e.target.value)}
        value={optionValue ? optionValue : null}
        className={twMerge("w-full  rounded-none focus:outline-none", className)}
      >
        <option disabled selected className=''>Pick a value</option>
        {options?.map((option, i) => (
          <option key={i} value={option} >  {option}</option>
        ))}
      </select>
    </div>
  );
};

