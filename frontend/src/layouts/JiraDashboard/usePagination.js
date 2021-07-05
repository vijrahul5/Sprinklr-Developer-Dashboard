import { useEffect, useState } from "react";
import GeneralApis from "./GeneralApis";
const EntryPerPage = 10;
const usePagination = (URL, jql) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState([]);
    const { getIssues } = GeneralApis();
    const [totalPages, setTotalPages] = useState(1);
    async function fillData() {
        let details = await getIssues(
            URL,
            (pageNumber - 1) * EntryPerPage,
            EntryPerPage,
            jql
        );
        let arr = details.issues.map((detail, index) => {
            console.log(detail);
            let newItem = [
                detail.fields.issuetype.name,
                detail.key,
                detail.fields.summary,
            ];
            if (detail.fields.priority) {
                newItem.push(detail.fields.priority.name);
            } else {
                newItem.push("none");
            }
            return newItem;
        });
        setData(arr);
        let totalPages = Math.ceil(details.total / EntryPerPage);
        setTotalPages(totalPages);
    }
    useEffect(() => {
        fillData();
    }, [pageNumber, URL, jql]);

    return {
        pageNumber,
        data,
        totalPages,
        setPageNumber,
    };
};

export default usePagination;
