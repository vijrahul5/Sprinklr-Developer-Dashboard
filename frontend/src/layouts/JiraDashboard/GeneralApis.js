import axios from "axios";

const GeneralApis = () => {
    //review-cycle-1: dont keep inside a general apis function. export each api separately
  async function getIssues(startAt, maxResults, jql) {
    try {
      let data = {
        startAt: startAt,
        maxResults: maxResults,
        jql: jql,
      };
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
