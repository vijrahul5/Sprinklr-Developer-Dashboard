import React, { useCallback } from "react";
import { Table as Tablebody } from "baseui/table-semantic";
import { Pagination as TableFooter } from "baseui/pagination";
import usePagination from "../usePagination.js";
import Loader from "../../../components/Loader/Loader.js";

const Table = ({ columnTitles, jqlQuery }) => {
  const { data, pageNumber, totalPages, setPageNumber, loading } =
    usePagination(jqlQuery);

  const changePage = useCallback(
    ({ nextPage }) => {
      setPageNumber(Math.min(Math.max(nextPage, 1), totalPages));
    },
    [totalPages]
  );
  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <div id="table">
          <Tablebody columns={columnTitles} data={data} />
          <div id="footer">
            <div id="footerleft"></div>
            <TableFooter
              numPages={totalPages}
              currentPage={pageNumber}
              onPageChange={changePage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
