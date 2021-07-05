import React from "react";
import useAuthorize from "../JIRA_Authorize/useAuthorize";
import JiraAuth from "../JIRA_Authorize/JiraAuth";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import Notification from "../Notify/Notification";
import Widgetjira from "../WidgetJira";

const Jira = () => {
    const { doneAuthentication } = useAuthorize();

    return (
        <>
            {doneAuthentication === false ? <JiraAuth /> : <Widgetjira />}
            <NotificationContainer />
            <Notification />
        </>
    );
};

export default Jira;
