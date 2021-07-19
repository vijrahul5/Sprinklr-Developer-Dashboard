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

const useExpe = (jql = "") => {
  //   const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  //   const [totalPages, setTotalPages] = useState(1);
  //   const [loading, setLoading] = useState(true);
  //   const [errMessage, setErrMessage] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults, setMaxResults] = useState(0);
  const [totalIssues, setTotalIssues] = useState(0);
  async function fetchData() {
    // setErrMessage("");
    let data = await getIssues(startIndex, maxResults, jql);
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
        setTotalIssues(details.total);
      } else {
        // setErrMessage(data.error);
      }
    }
    // setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, [jql, startIndex, maxResults]);

  return {
    startIndex,
    data,
    maxResults,
    totalIssues,
    setStartIndex,
    setMaxResults,
  };
};

useExpe.propTypes = {
  jql: PropTypes.string,
};
export default useExpe;
