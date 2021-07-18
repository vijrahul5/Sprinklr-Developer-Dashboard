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
  console.log("mmmaaa", startIndex, stopIndex);
  return axios.post("/api/jira/getDataByJql", data).then((response) => {
    if (response.data.status === "Success") {
      let result = response.data.data;
      let arr = result.issues.map((detail) => {
        let priority =
          detail.fields.priority !== null ? detail.fields.priority.name : "";
        let newItem = JiraTableBuilder()
          .setIssueName(detail.fields.issuetype.name)
          .setIssueSummary(detail.fields.summary)
          .setIssueKey("", detail.key)
          .setIssuePriority(priority)
          .setIssueStatus(detail.fields.status.name)
          .build();

        return newItem;
      });
      setList([...list, ...arr]);
      setLastLoadedIndex(stopIndex);
      setLoading(false);
      setRemoteCount(Math.min(result.total, stopIndex + 20));
    }
  });
};

export default loadMoreRows;