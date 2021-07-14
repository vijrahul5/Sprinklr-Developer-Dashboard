//libraries
import React from "react";
import PropTypes from "prop-types";

//hooks
import { useCallback } from "react";

//components
import { Table as Tablebody, DIVIDER } from "baseui/table-semantic";
import { Pagination as TableFooter } from "baseui/pagination";
import Loader from "../loaders/Tombstone";

//constants
const rootBorderOverride = {
  Root: {
    style: () => ({
      borderRadius: "4px",
    }),
  },
};

const Table = ({
  data,
  pageNumber,
  totalPages,
  setPageNumber,
  loading,
  columnTitles,
}) => {
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
      ) : totalPages > 0 ? (
        <>
          <div className="table">
            <Tablebody
              columns={columnTitles}
              data={data}
              divider={DIVIDER.grid}
              overrides={rootBorderOverride}
            />
            <div className="table__footer">
              <div className="table__footerLeft"></div>
              <TableFooter
                numPages={totalPages}
                currentPage={pageNumber}
                onPageChange={changePage}
                overrides={rootBorderOverride}
              />
            </div>
          </div>
        </>
      ) : (
        <p>No data were found to match your filter!!</p>
      )}
    </>
  );
};

Table.defaultProps = {
  pageNumber: 1,
  totalPages: 0,
};
Table.propTypes = {
  data: PropTypes.array,
  pageNumber: PropTypes.number,
  totalPages: PropTypes.number,
  setPageNumber: PropTypes.func,
  loading: PropTypes.bool,
  columnTitles: PropTypes.array,
};
export default Table;
