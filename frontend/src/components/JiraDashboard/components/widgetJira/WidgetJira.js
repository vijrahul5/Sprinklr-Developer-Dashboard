//libraries
import React from "react";
import { useState, useCallback, useEffect } from "react";

//hooks
import useGetJiraData from "../../hooks/useGetJiraData";

//components
import JqlFilter from "../filters/JqlFilter";
import BasicFilter from "../filters/BasicFilter";
import loadMoreRows from "../../apis/LoadRows";
import Expe from "../../../table/Expe";
import Loader from "../../../loaders/Tombstone";
import { useStyletron } from "baseui";
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
} from "baseui/table";

//constants
const columnTitles = ["Type", "Key", "Status", "Priority", "Summary"];

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
  const [css] = useStyletron();

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
        minWidth="1000px"
        loadtumbstone={loading}
      />
    </div>
  );
};

export default Widgetjira;