import axios from "axios";

const GeneralApis = () => {
  async function getIssues(startAt, maxResults, jql) {
    try {
      let data = {
        startAt: startAt,
        maxResults: maxResults,
        jql: jql,
      };
      console.log(data);
      let response = await axios.post("/api/jira/getDataByJql", data);
      if (response.data.status === "Failed") {
        throw new Error(response.data.error);
      }
      return response.data.data;
    } catch (err) {
      alert(err.message);
      return null;
    }
  }
  return { getIssues };
};

export default GeneralApis;
