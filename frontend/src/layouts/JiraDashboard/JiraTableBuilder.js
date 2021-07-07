import React from "react";
import highest_jira from "../../../src/assets/images/highest_jira.svg";
import high_jira from "../../../src/assets/images/high_jira.svg";
import medium_jira from "../../../src/assets/images/medium_jira.svg";
import low_jira from "../../../src/assets/images/low_jira.svg";
import lowest_jira from "../../../src/assets/images/lowest_jira.svg";

const JiraTableBuilder = () => {
  return {
    setIssueName: function (issueName) {
      this.issueName = issueName;
      return this;
    },
    setIssueKey: function (issueKey) {
      this.issueKey = issueKey;
      return this;
    },
    setIssueSummary: function (issueSummary) {
      this.issueSummary = issueSummary;
      return this;
    },
    setIssueStatus: function (issueStatus) {
      this.issueStatus = issueStatus;
      return this;
    },
    setIssuePriority: function (issuePriority) {
      this.issuePriority = "";
      if (issuePriority === "Highest") {
        this.issuePriority = (
          <img className="jp" src={highest_jira} alt="Highest"></img>
        );
      } else if (issuePriority === "High") {
        this.issuePriority = (
          <img className="jp" src={high_jira} alt="High"></img>
        );
      } else if (issuePriority === "Medium") {
        this.issuePriority = (
          <img className="jp" src={medium_jira} alt="Medium"></img>
        );
      } else if (issuePriority === "Low") {
        this.issuePriority = (
          <img className="jp" src={low_jira} alt="Low"></img>
        );
      } else if (issuePriority === "Lowest") {
        this.issuePriority = (
          <img className="jp" src={lowest_jira} alt="Lowest"></img>
        );
      }

      return this;
    },
    build: function () {
      return [
        this.issueName,
        this.issueKey,
        this.issueSummary,
        this.issueStatus,
        this.issuePriority,
      ];
    },
  };
};

export default JiraTableBuilder;
