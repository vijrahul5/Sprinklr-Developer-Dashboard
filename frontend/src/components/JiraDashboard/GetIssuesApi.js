import axios from "axios";

const GetIssuesApi = () => {
  async function getIssues(startAt, maxResults, jqlQuery) {
    let data = {
      startAt: startAt,
      maxResults: maxResults,
      jql: jqlQuery,
    };
    let response = await axios.post("/api/jira/getDataByJql", data);
    if (response.data.status === "Failed") {
      return null;
    }
    return {
      details: response.data.data,
      jiraBaseUrl: response.data.jiraBaseUrl,
    };
  }
  return { getIssues };
};

export default GetIssuesApi;
