import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const useAuthorize = () => {
  useEffect(() => {
    isAuthenticated();
  }, []);
  const history = useHistory();
  const [doneAuthentication, setDoneAuthentication] = useState(false);
  const [loading, setLoading] = useState(true);

  async function isAuthenticated() {
    try {
      const res = await axios.get("/api/jira/authenticated");
      console.log(res.data.status);
      if (res.data.status === "Success") {
        console.log("hi", res.data.done_jira_authentication);

        const authenticated = res.data.done_jira_authentication;
        if (!authenticated) {
          setDoneAuthentication(false);
        } else {
          setDoneAuthentication(res.data.done_jira_authentication);
        }
      } else {
        throw new Error();
      }
    } catch {
      setDoneAuthentication(false);
    }
    setLoading(false);
  }

  function goToHome() {
    history.replace("/dashboard");
    window.location.href = "http://localhost:3000/dashboard";
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
      alert("Server Error : Please try again");
    }
    goToHome();
  }
  return { showAuthPage, setupJira, doneAuthentication, goToHome, loading };
};

export default useAuthorize;
