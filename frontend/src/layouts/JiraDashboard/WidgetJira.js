import React, { useState, useCallback } from "react";

import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";
import { Select } from "baseui/select";

import Table from "./Table/Table";
import useFilters from "./useFilters";
import useEmployeeFilter from "./useEmployeeFilter";

const columnTitles = ["Type", "Key", "Summary", "Status", "Priority"];
const title = "All Issues";
const recentJql = localStorage.getItem("recentJql");

const Widgetjira = () => {
  const [jqlQuery, setJqlQuery] = useState(recentJql); //jqlQuery that we pass as prop to table
  const [inputValue, setInputValue] = useState(recentJql); //change in Input JQL query
  const [filterValue, setFilterValue] = useState([]); //change in Filter dropdown
  const [employeeFilterValue, setEmployeeFilterValue] = useState([]); //change in Employee Filter dropdown

  const { filters } = useFilters();
  const { employeeDetails } = useEmployeeFilter();

  const handleInputChange = useCallback(
    (event) => {
      setInputValue(event.target.value);
    },
    [inputValue]
  );

  const handleClick = useCallback(() => {
    setJqlQuery(inputValue);
    localStorage.setItem("recentJql", inputValue);
  }, [inputValue]);

  const handleFilter = useCallback(
    (params) => {
      setFilterValue(params.value);
      if (params.value.length > 0) setJqlQuery(`filter=${params.value[0].id}`);
    },
    [filterValue]
  );

  const handleEmployeeFilter = useCallback(
    (params) => {
      setEmployeeFilterValue(params.value);
      if (params.value.length > 0)
        setJqlQuery(`assignee in ("${params.value[0].id}")`);
    },
    [filterValue]
  );
  return (
    <div id="jiraTable">
      <div id="jiraJqlContainer">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter JQL to search issues"
          clearOnEscape
          size={SIZE.compact}
        />
        <Button onClick={handleClick} className="ml1 btnCustom" size={SIZE.compact}>
          Search
        </Button>
      </div>
      <div className="mb12">
        <Select
          size={SIZE.compact}
          options={filters}
          value={filterValue}
          placeholder="Select Filter"
          onChange={handleFilter}
        />
      </div>
      <div className="mb12">
        <Select
          size={SIZE.compact}
          options={employeeDetails}
          value={employeeFilterValue}
          placeholder="Select Employee to see Assigned issue to him/her"
          onChange={handleEmployeeFilter}
        />
      </div>

      <Table columnTitles={columnTitles} title={title} jqlQuery={jqlQuery} />
    </div>
  );
};

export default Widgetjira;
