import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const useAuthorize = () => {
  const history = useHistory();
  const [doneAuthentication, setDoneAuthentication] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    isAuthenticated();
  }, []);
  useEffect(() => {
    if (history.location.search.includes("code")) {
      setupJira();
    }
  }, [history.location]);

  async function isAuthenticated() {
    const res = await axios.get("/api/jira/authenticated");
    if (res.data.status === "Success") {
      const authenticated = res.data.done_jira_authentication;
      if (authenticated) {
        setDoneAuthentication(res.data.done_jira_authentication);
      }
    } else {
      setDoneAuthentication(false);
    }

    setLoading(false);
  }

  function goToHome() {

    history.replace("/dashboard");
    window.location.href = "http://localhost:3000/dashboard";
    window.location.reload();
  }
  function showAuthPage(URL) {
    window.location.href = URL;
  }
  function getAuthCode() {
    let len = window.location.href.length;
    let AUTH_CODE = window.location.href.slice(37, len - 12);
    console.log(AUTH_CODE);
    return AUTH_CODE;
  }

  async function setupJira() {
    setLoading(true);

    try {
      const AUTH_CODE = getAuthCode();

      const data = {
        auth_code: AUTH_CODE,
      };
      let response = await axios.post("/api/jira", data);
      if (response.data.status === "Failed") {
        throw new Error();
      }
      setDoneAuthentication(true);
    } catch (err) {
      console.error("Server Error");
    }
    goToHome();
    setLoading(false);

  }
  return { showAuthPage, setupJira, doneAuthentication, goToHome, loading };
};

export default useAuthorize;
