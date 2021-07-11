import React from "react";
import highest_jira from "../assets/images/highest_jira.svg";
import high_jira from "../assets/images/high_jira.svg";
import medium_jira from "../assets/images/medium_jira.svg";
import low_jira from "../assets/images/low_jira.svg";
import lowest_jira from "../assets/images/lowest_jira.svg";

const JiraTableBuilder = () => {
  return {
    setIssueName: function (issueName) {
      this.issueName = issueName;
      return this;
    },
    setIssueKey: function (jiraBaseUrl, issueKey) {
      const url = jiraBaseUrl + "/browse" + `/${issueKey}`;
      this.issueKey = (
        <a href={url} className="jiraIssueUrl">
          {issueKey}
        </a>
      );
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
      let imgSrc = new Map();
      imgSrc.set("Highest", highest_jira);
      imgSrc.set("High", high_jira);
      imgSrc.set("Medium", medium_jira);
      imgSrc.set("Low", low_jira);
      imgSrc.set("Lowest", lowest_jira);

      if (imgSrc.has(issuePriority)) {
        this.issuePriority = (
          <>
            <img
              className="jp"
              src={imgSrc.get(issuePriority)}
              alt={issuePriority}
            ></img>
            <p className="jp__description">{issuePriority}</p>
          </>
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
