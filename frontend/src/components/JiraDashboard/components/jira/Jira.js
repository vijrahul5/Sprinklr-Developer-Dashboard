//libraries
import React, { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import "react-notifications/lib/notifications.css";

//hooks
import useAuthorize from "../../hooks/useAuthorize";

//components
import Notification from "../notification/Notification";
import Loader from "../../../loaders/Tombstone";
import Expe from "../../../Table/Expe";

const Jira = ({ user }) => {
  const { doneAuthentication, loading } = useAuthorize();

  //lazy loading
  const Widgetjira = lazy(() => import("../widgetJira/WidgetJira"));
  const JiraAuth = lazy(() => import("../jiraAuthorization/JiraAuth"));
  return (
    <>
      {loading ? <Loader /> : <></>}
      <Suspense
        fallback={() => {
          return <Loader />;
        }}
      >
        {!loading && !doneAuthentication ? <JiraAuth /> : <></>}
        {!loading && doneAuthentication ? <Widgetjira user={user} /> : <></>}
      </Suspense>
      <Notification />
    </>
  );
};
Jira.propTypes = {
  user: PropTypes.object,
};

export default Jira;
