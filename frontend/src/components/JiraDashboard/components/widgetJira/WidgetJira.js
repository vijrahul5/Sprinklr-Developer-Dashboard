//libraries
import React from "react";
import { useState, useCallback } from "react";

//hooks
import useGetJiraData from "../../hooks/useGetJiraData";

//components
import JqlFilter from "../filters/JqlFilter";
import BasicFilter from "../filters/BasicFilter";
import loadMoreRows from "../../apis/LoadRows";
import Expe from "../../../table/Expe";
//constants
const columnTitles = ["Type", "Key", "Summary", "Status", "Priority"];

const Widgetjira = ({ user }) => {
  const [jqlQuery, setJqlQuery] = useState(`assignee in ("${user.email}")`);
  const [basicMode, setBasicMode] = useState(true);
  const { data, pageNumber, totalPages, setPageNumber, loading, errMessage } =
    useGetJiraData(jqlQuery);

  const handleClick = useCallback((inputJqlQuery) => {
    setJqlQuery(inputJqlQuery);
  }, []);

  const handleSwitch = useCallback(() => {
    if (!basicMode) setJqlQuery(`assignee in ("${user.email}")`);
    setBasicMode((prevMode) => !prevMode);
  }, [basicMode]);

  return (
    <div className="jiraWid">
      {basicMode ? (
        <BasicFilter
          handleSwitch={handleSwitch}
          setJqlQuery={setJqlQuery}
          user={user}
        />
      ) : (
        <JqlFilter
          errMessage={errMessage}
          handleSwitch={handleSwitch}
          handleClick={handleClick}
          user={user}
        />
      )}
      <Expe
        jql={jqlQuery}
        columnTitles={columnTitles}
        loadMoreRows={loadMoreRows}
        minWidth="750px"
      />
    </div>
  );
};

export default Widgetjira;
