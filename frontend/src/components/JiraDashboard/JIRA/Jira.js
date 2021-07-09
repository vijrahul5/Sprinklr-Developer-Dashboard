import React from "react";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import useAuthorize from "../JIRA_Authorize/useAuthorize";
import JiraAuth from "../JIRA_Authorize/JiraAuth";
import Notification from "../Notify/Notification";
import Widgetjira from "../WidgetJira";
import Loader from "../../../globalComponents/Loader/Loader";

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

      <NotificationContainer />
      <Notification />
    </>
  );
};

export default Jira;
