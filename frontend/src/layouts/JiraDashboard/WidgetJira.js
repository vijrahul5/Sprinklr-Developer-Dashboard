import React, { useState } from "react";
import { Input } from "baseui/input";
import { Button, SIZE } from "baseui/button";
import Tableview from "./Table/Tableview";

const CLOUD_ID = localStorage.getItem("CLOUD_ID");
const URL = `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/api/3/search`;
const heading = ["Type", "Key", "Summary", "Priority"];
const title = "All Issues";
const recentJql = localStorage.getItem("recentJql");

const Widgetjira = () => {
  const [jql, setJql] = useState(recentJql);
  const [value, setValue] = useState(recentJql);

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
            console.log("Clicked");
            setJql(value);
            localStorage.setItem("recentJql", value);
          }}
          style={{ marginLeft: "1rem" }}
          size={SIZE.compact}
        >
          Search
        </Button>
      </div>
      <Tableview URL={URL} heading={heading} title={title} jql={jql} />
    </div>
  );
};

export default Widgetjira;
