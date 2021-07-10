import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NotificationManager from "react-notifications/lib/NotificationManager";
import axios from "axios";

const startLenghtUrlForAuthCode = 37;
const endLenghtUrlForAuthCode = 12;
const notificationDisplayTime = 5000; // in milliseconds
const useAuthorize = () => {
  const history = useHistory();
  const [doneAuthentication, setDoneAuthentication] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isAuthenticated();
  }, []);
  useEffect(() => {
    if (history.location.search.includes("code")) {
      setupJira().then(() => {
        if (doneAuthentication) {
          history.replace("/dashboard");
          setLoading(false);
        }
      });
    }
  }, [history.location, doneAuthentication]);

  async function isAuthenticated() {
    const res = await axios.get("/api/jira/authenticated");
    if (res.data.status === "Success") {
      const authenticated = res.data.doneJiraAuthentication;
      if (authenticated) {
        setDoneAuthentication(res.data.doneJiraAuthentication);
      }
    } else {
      setDoneAuthentication(false);
    }
    if (!history.location.search.includes("code")) setLoading(false);
  }

  function showAuthPage(URL) {
    window.location.href = URL;
  }
  function getAuthCode() {
    let len = window.location.href.length;
    let authCode = window.location.href.slice(
      startLenghtUrlForAuthCode,
      len - endLenghtUrlForAuthCode
    );
    return authCode;
  }

  async function setupJira() {
    setLoading(true);

    try {
      const authCode = getAuthCode();

      const data = {
        authCode: authCode,
      };
      let response = await axios.post("/api/jira", data);
      if (response.data.status === "Failed") {
        throw new Error();
      }
      setDoneAuthentication(true);
    } catch (err) {
      setLoading(false);
      NotificationManager.error(
        "Server Error",
        "Please try again",
        notificationDisplayTime
      );
    }
  }
  return { showAuthPage, doneAuthentication, loading };
};

export default useAuthorize;
