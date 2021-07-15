import React, { useState, useCallback } from "react";
import JqlFilter from "../filters/JqlFilter";
import BasicFilter from "../filters/BasicFilter";
import Table from "../../../table/Table";
import useGetJiraData from "../../hooks/useGetJiraData";

const columnTitles = ["Type", "Key", "Summary", "Status", "Priority"];
const title = "All Issues";

const Widgetjira = () => {
  const [jqlQuery, setJqlQuery] = useState("");
  const [basicMode, setBasicMode] = useState(true);
  const { data, pageNumber, totalPages, setPageNumber, loading, errMessage } =
    useGetJiraData(jqlQuery);

  const handleClick = useCallback((inputJqlQuery) => {
    setJqlQuery(inputJqlQuery);
  }, []);

  const handleSwitch = useCallback(() => {
    setBasicMode((prevMode) => !prevMode);
  }, []);
  return (
    <div className="jiraWid">
      {basicMode ? (
        <BasicFilter handleSwitch={handleSwitch} setJqlQuery={setJqlQuery} />
      ) : (
        <JqlFilter
          errMessage={errMessage}
          handleSwitch={handleSwitch}
          handleClick={handleClick}
        />
      )}

      <Table
        columnTitles={columnTitles}
        title={title}
        data={data}
        pageNumber={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
        loading={loading}
      />
    </div>
  );
};

export default Widgetjira;
