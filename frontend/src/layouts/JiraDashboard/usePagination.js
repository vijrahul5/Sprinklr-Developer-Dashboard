//review-cycle-1: divide your imports into libraries, hooks, components, constants, utils. it gives more readability
import { useEffect, useState } from "react";
import GeneralApis from "./GeneralApis";
const EntryPerPage = 5;
const usePagination = (jql) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  
  //review-cycle-1: this can be written outside hook as well
  const { getIssues } = GeneralApis();
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  //review-cycle-1: rename to fetchData/getData
  async function fillData() {
    let details = await getIssues(
      (pageNumber - 1) * EntryPerPage,
      EntryPerPage,
      jql
    );

    if (details) {
      let arr = details.issues.map((detail) => {
        //review-cycle-1: you can use builder pattern here
        let newItem = [
          detail.fields.issuetype.name,
          detail.key,
          detail.fields.summary,
        ];
        if (detail.fields.priority) {
          newItem.push(detail.fields.priority.name);
        } else {
          newItem.push("NA");
        }
        return newItem;
      });
      setData(arr);
      let totalPages = Math.ceil(details.total / EntryPerPage);
      setTotalPages(totalPages);
    }
    setLoading(false);
  }
  useEffect(() => {
    fillData();
  }, [pageNumber, jql]);

  return {
    pageNumber,
    data,
    totalPages,
    setPageNumber,
    loading,
  };
};

export default usePagination;
