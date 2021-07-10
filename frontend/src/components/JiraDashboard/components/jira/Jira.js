import React from "react";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import useAuthorize from "../jiraAuthorization/useAuthorize";
import JiraAuth from "../jiraAuthorization/JiraAuth";
import Notification from "../notification/Notification";
import Widgetjira from "../WidgetJira";
import Loader from "../../../Loader/Loader";

const Jira = () => {
  const { doneAuthentication, loading } = useAuthorize();
  console.log("Jiraa", doneAuthentication);
  return (
    <>
      <div className="section">
        <h1>Jira</h1>
        {loading === true ? (
          <Loader />
        ) : doneAuthentication === false ? (
          <JiraAuth />
        ) : (
          <Widgetjira />
        )}
      </div>

      <NotificationContainer />
      <Notification />
    </>
  );
};

export default Jira;
