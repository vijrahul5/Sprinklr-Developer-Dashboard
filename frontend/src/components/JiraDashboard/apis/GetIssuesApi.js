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
      return {
        status: "Failed",
        error: response.data.error,
      };
    }
    return {
      status: "Success",
      details: response.data.data,
      jiraBaseUrl: response.data.jiraBaseUrl,
    };
  }
  return { getIssues };
};

export default GetIssuesApi;
