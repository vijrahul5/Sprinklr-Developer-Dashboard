import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import GetIssuesApi from "../components/GetIssuesApi";
import JiraTableBuilder from "../components/JiraTableBuilder";

const { getIssues } = GetIssuesApi();
const EntryPerPage = 9;

const useGetJiraData = (jql) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  async function fetchData() {
    let data = await getIssues(
      (pageNumber - 1) * EntryPerPage,
      EntryPerPage,
      jql
    );
    if (data) {
      if (data.status === "Success") {
        setErrMessage("");
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
      } else {
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
    errMessage,
  };
};
useGetJiraData.defaultProps = {
  jql: "",
};
useGetJiraData.propTypes = {
  jql: PropTypes.string,
};
export default useGetJiraData;
