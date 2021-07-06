import React, { useState } from "react";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";
import Tableview from "./Table/Tableview";
import { Select } from "baseui/select";
import useFilters from "./useFilters";
const heading = ["Type", "Key", "Summary", "Priority"];
const title = "All Issues";
const recentJql = localStorage.getItem("recentJql");

const Widgetjira = () => {
  const [jql, setJql] = useState(recentJql);
  const [value, setValue] = useState(recentJql);
  const [filterValue, setFilterValue] = useState([]);
  const { filters } = useFilters();
  return (
    <div id="jiraTable">
      <div style={{ display: "flex", width: "100%", marginBottom: "0.5rem" }}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter JQL to search issues"
          clearOnEscape
          size={SIZE.compact}
        />
        <Button
          onClick={() => {
            setJql(value);
            localStorage.setItem("recentJql", value);
          }}
          style={{ marginLeft: "1rem" }}
          size={SIZE.compact}
        >
          Search
        </Button>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <Select
          size={SIZE.compact}
          options={filters}
          value={filterValue}
          placeholder="Select Filter"
          onChange={(params) => {
            setFilterValue(params.value);
            if (params.value.length > 0) setJql(`filter=${params.value[0].id}`);
          }}
        />
      </div>

      <Tableview heading={heading} title={title} jql={jql} />
    </div>
  );
};

export default Widgetjira;
