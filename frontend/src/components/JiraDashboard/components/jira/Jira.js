import React from "react";
import "react-notifications/lib/notifications.css";

import useAuthorize from "../../hooks/useAuthorize";
import JiraAuth from "../jiraAuthorization/JiraAuth";
import Notification from "../notification/Notification";
import Widgetjira from "../widgetJira/WidgetJira";
import Loader from "../../../loaders/Tombstone";

const Jira = () => {
  const { doneAuthentication, loading } = useAuthorize();
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
