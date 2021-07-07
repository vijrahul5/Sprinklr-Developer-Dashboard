import React from "react";
import { Button, SIZE } from "baseui/button";
import { Heading, HeadingLevel } from "baseui/heading";

import useAuthorize from "./useAuthorize";

require("dotenv").config();

const clientId = process.env.REACT_APP_CLIENT_ID_JIRA;
const URL = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${clientId}&scope=offline_access%20read%3Ajira-user%20read%3Ajira-work%20manage%3Ajira-project%20manage%3Ajira-configuration%20write%3Ajira-work%20manage%3Ajira-webhook%20manage%3Ajira-data-provider&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&state=jiiaa&response_type=code&prompt=consent`;

const JiraAuth = () => {
  const { showAuthPage } = useAuthorize();

  return (
    <div id="jiraAuth">
      <HeadingLevel>
        <Heading className="jiraauthHeading">Jira Authorization</Heading>
      </HeadingLevel>
      <div className="authbtn">
        <Button
          onClick={() => {
            showAuthPage(URL);
          }}
          size={SIZE.compact}
        >
          Authorize
        </Button>
      </div>
    </div>
  );
};

export default JiraAuth;
