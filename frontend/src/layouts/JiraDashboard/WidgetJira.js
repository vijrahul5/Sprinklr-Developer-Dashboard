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
  //review-cycle-1: why do you need both jql and value?
  const [jql, setJql] = useState(recentJql);
  const [value, setValue] = useState(recentJql);
  const [filterValue, setFilterValue] = useState([]);
  const { filters } = useFilters();
  return (
    <div id="jiraTable">
    //review-cycle-1: don't use inline styles
      <div style={{ display: "flex", width: "100%", marginBottom: "0.5rem" }}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter JQL to search issues"
          clearOnEscape
          size={SIZE.compact}
        />
        <Button
//review-cycle-1: take out function in a variable and use useCallback
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
//review-cycle-1: don't use inline styles
      <div style={{ marginBottom: "0.5rem" }}>
        <Select
          size={SIZE.compact}
          options={filters}
          value={filterValue}
          placeholder="Select Filter"
//review-cycle-1: take out function in a variable and use useCallback
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
