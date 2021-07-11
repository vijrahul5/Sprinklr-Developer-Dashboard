import React, { useCallback } from "react";
import { Table as Tablebody, DIVIDER } from "baseui/table-semantic";
import { Pagination as TableFooter } from "baseui/pagination";
import Loader from "../Loader/Loader";
import PropTypes from "prop-types";
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
            {}
            {loading === true ? (
                <Loader />
            ) : totalPages > 0 ? (
                <>
                    <div id="table">
                        <Tablebody
                            columns={columnTitles}
                            data={data}
                            divider={DIVIDER.grid}
                            overrides={{
                                Root: {
                                    style: ({ $theme }) => ({
                                        borderRadius: "4px",
                                    }),
                                },
                            }}
                        />
                        <div id="footer">
                            <div id="footerleft"></div>
                            <TableFooter
                                numPages={totalPages}
                                currentPage={pageNumber}
                                onPageChange={changePage}
                                overrides={{
                                    Root: {
                                        style: ({ $theme }) => ({
                                            borderRadius: "4px",
                                        }),
                                    },
                                }}
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
