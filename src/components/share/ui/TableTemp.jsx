import React from "react";
import { Link } from "react-router-dom";
import { TableActionDropdown } from "./Dropdown";
import { PdfIcon } from "../../../Assets/locales/UserDetailsIcons";

function TableTemp({
  tableHead,
  data,
  customIdFieldName,
  fieldsToShow,
  btn = false,
  linkUrl = "",
  linkOnly = false,
  linkFieldName = "",
  assignLinkOnHeader = "",
  isImage = false,
  isImageLink = false,
  actionData,
  fixedWith = false,
  documentFieldName = '',
  document = false,
  userID = false,
  idFieldName = "",
  customID }) {

  const greenColor = ["completed", "Completed", "paid", "Paid", "Active", "active", "regular", "Regular", "Verified", "verified", "approved"];
  const blueColor = ["on process", "unpaid", "trial", "On Process", "Trial", "Accepted"];
  const redColor = ["cancelled", "inactive", "suspended", "irregular", "Cancelled", "Inactive", "Suspended", "Irregular", "deActive", "Canceled", "Deactive", "blocked", "rejected"];
  const yellowColor = ["pending", "Pending", "on going", "On Going", "Ongoing", "Unpaid"];
  const ColorField = ["status", "req_status", "activity", "Payment Status", "payment status", "pending", "paymentStatus", "expert_request"]

  return (
    <table className={`w-full  rounded-[14px] ${!data?.length ? "" : "border"}`}>
      <thead className="">
        <tr className="w-full h-16">
          {customID && <th>ID</th>}
          {tableHead
            ?.filter((thead) => fieldsToShow?.includes(thead?.field))
            ?.map((thead, i) => (
              <th key={i} className={`text-left font-inter text-base font-medium px-2`} >
                {thead?.name}
              </th>))}
          {btn && (<th className="px-2 text-base font-medium text-left font-inter">  Action </th>)}
        </tr>
      </thead>
      {!data?.length ?
        <tbody className="relative w-full bg-white ">
          {tableHead.map((row, i) => (
            <th key={i} className={`h-20 text-left font-inter text-base font-medium px-2`} />))}
          <p className="absolute left-[45%] flex flex-col items-center justify-center mt-10 text-md font-bold text-red-500">no data found</p>
          <div className=""></div>
        </tbody>
        : <tbody className="w-full bg-white ">
          {data?.map((row, i) =>
            <tr key={i + 1}
              className="z-0 h-20 px-2 leading-none text-gray-800 border hover:bg-gray-100">
              {customID && <th className="px-3 text-center ">{i + 1}</th>}
              {tableHead
                ?.filter((thead) => fieldsToShow.includes(thead.field))
                ?.map((thead) => {
                  return (
                    <td key={thead?.id} className="px-2 ">
                      <>
                        {userID && thead.field === idFieldName && (
                          <div className="tooltip tooltip-right bg-inherit" data-tip={row[thead.field]}>  {row[thead.field] ? row[thead.field].slice(0, 5) + "..." : row[thead.field]}
                          </div>
                        )}
                        {thead.field === assignLinkOnHeader && (
                          isImage ?
                            (isImageLink ? (
                              <Link to={`${linkUrl}/${encodeURIComponent(customIdFieldName ? row[customIdFieldName] : row.id)}`}>
                                <img className="w-[35px]  h-[35px] object-cover rounded-md"
                                  src={row[thead.field]} alt="image" />
                              </Link>) :
                              (<img className="w-[35px] h-[35px]" src={row[thead.field]} alt="image" />))
                            :
                            (<Link to={`${linkUrl}/${encodeURIComponent(customIdFieldName ? row[customIdFieldName] : row.id)}`}
                              className="pl-[5px] text-base font-normal text-left font-poppins text-blue-500 underline  "
                            > {row[thead.field]}
                            </Link>)
                        )}
                        {document && thead.field === documentFieldName && (
                          <a href={row[thead.field]}
                            className="pl-[5px] text-base font-normal text-left font-poppins text-blue-500  " target="_blank" rel="noreferrer">
                            {row[thead.field] ?
                              <PdfIcon className="w-2 h-6 text-blue-400" />
                              : <p className="-mt-4 text-sm text-gray-500 cursor-not-allowed disabled ">No Document</p>}
                          </a>
                        )}
                        {thead.field === linkFieldName && linkOnly ? (
                          <Link to={`${linkUrl}/${encodeURIComponent(customIdFieldName ? row[customIdFieldName] : row.id)}`}
                            className="pl-[5px] text-base font-normal text-left font-poppins text-blue-500 "> {row[thead.field]} </Link>)
                          :
                          (<p className={` text-base font-normal text-left font-poppins  w-max  rounded-full px-2 py-1 
                          ${ColorField.includes(thead.field) ?
                              greenColor.includes(row[thead.field]) ? "bg-[#63AD6F]  text-[#63AD6F] bg-opacity-10  text-sm" :
                                blueColor.includes(row[thead.field]) ? "bg-[#3B76E1] bg-opacity-10  text-[#3B76E1] text-sm" :
                                  redColor.includes(row[thead.field]) ? "bg-[#F76868]  text-[#F76868] bg-opacity-10 text-sm" :
                                    yellowColor.includes(row[thead.field]) ? "bg-[#FF9F43]  text-[#FF9F43] bg-opacity-10 text-sm" : "" : ""}   
                            ${thead.field === assignLinkOnHeader && "hidden"}
                            ${thead.field === documentFieldName && "hidden"}
                            ${userID && thead.field === idFieldName && "hidden"}
                            `}>
                            {/* Access nested properties */}
                            {thead.field.includes(".")
                              ? row[thead.field.split(".")[0]][thead.field.split(".")[1]]
                              : row[thead.field]?.length > 5 && fixedWith ?
                                <>
                                  <div className={`${fixedWith} text-[14px]`}>
                                    {row[thead.field].length > 50 ? row[thead.field].slice(0, 50) + "..." : row[thead.field]
                                    }
                                  </div>
                                </> : row[thead.field]}
                          </p>)}
                      </>
                    </td>
                  )
                })}
              <td className="px-2 text-base font-medium text-left font-inter">
                {btn && <TableActionDropdown actionData={actionData} data={row} />}
              </td>
            </tr>
          )}
        </tbody>}
    </table>
  );
}
export default TableTemp;