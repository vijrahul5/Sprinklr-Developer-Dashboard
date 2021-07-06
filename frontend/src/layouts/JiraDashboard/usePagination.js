import { useEffect, useState } from "react";
import GeneralApis from "./GeneralApis";
const EntryPerPage = 5;
const usePagination = (URL, jql) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const { getIssues } = GeneralApis();
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  async function fillData() {
    let details = await getIssues(
      (pageNumber - 1) * EntryPerPage,
      EntryPerPage,
      jql
    );

    if (details) {
      let arr = details.issues.map((detail, index) => {
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
    setLoading(false);
  }
  useEffect(() => {
    fillData();
  }, [pageNumber, URL, jql]);

  return {
    pageNumber,
    data,
    totalPages,
    setPageNumber,
    loading,
  };
};

export default usePagination;
