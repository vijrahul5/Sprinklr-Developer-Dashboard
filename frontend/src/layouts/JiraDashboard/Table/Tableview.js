import React from "react";
import { Table } from "baseui/table-semantic";
import { Pagination } from "baseui/pagination";
import usePagination from "../usePagination.js";
import Loader from "../../../components/Loader/Loader.js";
const Tableview = ({ heading, jql }) => {
  const { data, pageNumber, totalPages, setPageNumber, loading } =
    usePagination(jql);

  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <div style={{ width: "100%" }} id="jiraTableView">
          <Table columns={heading} data={data} />
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: "1" }}></div>
            <Pagination
              numPages={totalPages}
              currentPage={pageNumber}
              onPageChange={({ nextPage }) => {
                setPageNumber(Math.min(Math.max(nextPage, 1), totalPages));
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Tableview;
