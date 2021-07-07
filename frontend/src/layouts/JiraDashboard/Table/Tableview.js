import React from "react";
import { Table } from "baseui/table-semantic";
import { Pagination } from "baseui/pagination";
import usePagination from "../usePagination.js";
import Loader from "../../../components/Loader/Loader.js";

//review-cycle-1: move this component to common place as gitlab widget will also use this
//review-cycle-1: rename jql to jqlQuery
const Tableview = ({ heading, jql }) => {
  const { data, pageNumber, totalPages, setPageNumber, loading } =
    usePagination(jql);

  return (
    <>
      {loading === true ? (
       //review-cycle-1: need a tombstone
        <Loader />
      ) : (
        <div style={{ width: "100%" }} id="jiraTableView">
        {/* review-cycle-1: why is headline going in columns. something looks odd here */}
          <Table columns={heading} data={data} />
            {/* review-cycle-1: don't use inline styles. use scss */}
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: "1" }}></div>
{/* review-cycle-1: can rename to to table footer */}
            <Pagination
              numPages={totalPages}
              currentPage={pageNumber}
// review-cycle-1: take out function in a variable wrapped with useCallback. read about useCallback and useMemo hooks
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

//review-cycle-1: can rename to table instead of table view. 
export default Tableview;
