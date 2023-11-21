import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../Assets/icons";

const TablePagination = ({
  data,
  currentPage,
  setcurrentPage,
  itemsPerPage,
}) => {
  const [pageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(7);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={
            currentPage === number
              ? "pr-auto flex h-8 w-8 items-center justify-center rounded-full border bg-slate-200 p-2 text-lg font-semibold"
              : "pr-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border p-2 text-lg font-semibold"
          }>
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const noDataFound = "No Data Found";
  return (
    <div className="">
      {/* <div className="items-center justify-start w-full gap-2 d-flex"> */}
      {data?.length > 0 ? (
        <>
          <ul className="flex items-center justify-end gap-3">
            <li>
              <button
                onClick={handlePrevbtn}
                disabled={currentPage === pages[0] ? true : false}>
                <ArrowLeftIcon />
              </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}

            <li>
              <button
                onClick={handleNextbtn}
                disabled={
                  currentPage === pages[pages.length - 1] ? true : false
                }>
                <ArrowRightIcon />
              </button>
            </li>
          </ul>
        </>
      ) : (
        noDataFound
      )}
      {/* </div> */}
    </div>
  );
};

export default TablePagination;
