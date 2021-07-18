//libraries
import axios from "axios";
import JiraTableBuilder from "../components/builder/JiraTableBuilder";

const loadMoreRows = function ({
  startIndex,
  stopIndex,
  setLoading,
  jql,
  setList,
  setLastLoadedIndex,
  list,
  setRemoteCount,
}) {
  setLoading(true);
  let data = {
    startAt: startIndex,
    maxResults: stopIndex - startIndex + 1,
    jql: jql,
  };
  return axios.post("/api/jira/getDataByJql", data).then((response) => {
    if (response.data.status === "Success") {
      let result = response.data.data;
      let jiraBaseUrl = response.data.jiraBaseUrl;
      let arr = result.issues.map((detail) => {
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
      if (result.total === 0) {
        setRemoteCount(1);
      } else {
        setList([...list, ...arr]);
        setLastLoadedIndex(stopIndex);
        setRemoteCount(Math.min(result.total, stopIndex + 20));
      }
    }
    setLoading(false);
  });
};

export default loadMoreRows;
