import React from 'react';
import ReactPaginate from 'react-paginate';

const Paginate = ({ loadDataFn, total }) => {
  const pageCount = total?.data?.total
  const totalPage = pageCount ? Math.ceil(pageCount / 10) : 1
  return (
    <>
      <div className="flex items-center justify-between px-8 py-2 bg-white bottom-1">
        <div className="">Total Data : {pageCount} </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={loadDataFn}
          pageRangeDisplayed={2}
          pageCount={totalPage}
          previousLabel="<"
          containerClassName="flex flex-row items-center justify-center gap-2 ml-4"
          activeClassName=" bg-primary text-white px-2 py-1 rounded-md gap-2 border"
          pageClassName="px-2 py-1 rounded-md gap-2 border"
          renderOnZeroPageCount={1}
        />
      </div>
    </>
  );
};

export default Paginate;