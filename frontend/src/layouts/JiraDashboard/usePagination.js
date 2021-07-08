//hooks
import { useEffect, useState } from "react";
//components
import GetIssuesApi from "./GetIssuesApi";
import JiraTableBuilder from "./JiraTableBuilder";
//constants
const { getIssues } = GetIssuesApi();
const EntryPerPage = 8;

const usePagination = (jql) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    let data = await getIssues(
      (pageNumber - 1) * EntryPerPage,
      EntryPerPage,
      jql
    );

    if (data) {
      let details = data.details;
      let jiraBaseUrl = data.jiraBaseUrl;
      let arr = details.issues.map((detail) => {
        let priority =
          detail.fields.priority !== null ? detail.fields.priority.name : "";
        let newItem = JiraTableBuilder()
          .setIssueName(detail.fields.issuetype.name)
          .setIssueSummary(detail.fields.summary)
          .setIssueKey(jiraBaseUrl, detail.key)
          .setIssuePriority(priority)
          .setIssueStatus(detail.fields.status.name)
          .build();
        return newItem;
      });
      setData(arr);
      let totalPages = Math.ceil(details.total / EntryPerPage);
      setTotalPages(totalPages);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
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
