import React from "react";
import "react-notifications/lib/notifications.css";

import useAuthorize from "../jiraAuthorization/useAuthorize";
import JiraAuth from "../jiraAuthorization/JiraAuth";
import Notification from "../notification/Notification";
import Widgetjira from "../WidgetJira";
import Loader from "../../../../globalComponents/Loader/Loader";

const Jira = () => {
  const { doneAuthentication, loading } = useAuthorize();
  console.log("Jiraa", doneAuthentication);
  return (
    <>
      {loading === true ? (
        <Loader />
      ) : doneAuthentication === false ? (
        <JiraAuth />
      ) : (
        <Widgetjira />
      )}

      <Notification />
    </>
  );
};

export default Jira;
