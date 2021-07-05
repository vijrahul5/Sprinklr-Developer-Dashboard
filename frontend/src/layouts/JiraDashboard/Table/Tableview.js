import React from "react";
import { Table } from "baseui/table-semantic";
import { Pagination } from "baseui/pagination";
import usePagination from "../usePagination.js";
const Tableview = ({ URL, heading, title, jql }) => {
    const { data, pageNumber, totalPages, setPageNumber } = usePagination(
        URL,
        jql
    );

    return (
        <>
            <div style={{ width:"100%" } } id="jiraTableView">
                <Table columns={heading} data={data} />
                <Pagination
                    numPages={totalPages}
                    currentPage={pageNumber}
                    onPageChange={({ nextPage }) => {
                        setPageNumber(
                            Math.min(Math.max(nextPage, 1), totalPages)
                        );
                    }}
                />
            </div>
        </>
    );
};

export default Tableview;
