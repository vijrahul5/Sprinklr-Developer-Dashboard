//libraries
import PropTypes from "prop-types";

//hooks
import { useEffect, useState } from "react";

//components
import GetIssuesApi from "../apis/GetIssuesApi";
import JiraTableBuilder from "../components/builder/JiraTableBuilder";

//constants
const EntryPerPage = 8;
const { getIssues } = GetIssuesApi();

const useGetJiraData = (jql = "") => {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  async function fetchData() {
    setErrMessage("");
    let data = await getIssues(
      (pageNumber - 1) * EntryPerPage,
      EntryPerPage,
      jql
    );
    if (data) {
      if (data.status === "Success") {
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
        setLoading(false);
      } else {
        setLoading(false);
        setErrMessage(data.error);
      }
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
    setLoading,
    errMessage,
  };
};

useGetJiraData.propTypes = {
  jql: PropTypes.string,
};
export default useGetJiraData;
