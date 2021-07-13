import React from "react";
import { Button, SIZE } from "baseui/button";

import useAuthorize from "../../hooks/useAuthorize";
import Instruction from "../../../instruction/Instruction";
require("dotenv").config();

const clientId = process.env.REACT_APP_CLIENT_ID_JIRA;
const URL = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${clientId}&scope=offline_access%20read%3Ajira-user%20read%3Ajira-work%20manage%3Ajira-project%20manage%3Ajira-configuration%20write%3Ajira-work%20manage%3Ajira-webhook%20manage%3Ajira-data-provider&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&state=jiiaa&response_type=code&prompt=consent`;
const btnOverride = {
  Root: {
    style: () => ({
      borderRadius: "4px",
    }),
  },
};
const instructions = [
  "Click on Authorize for Jira Authorization.",
  "It will Redirect to jira permission page.",
  "Select account/domain and click allow",
  "Now you can get Issues based on filter and JQL",
];
const JiraAuth = () => {
  const { showAuthPage } = useAuthorize();

  return (
    <>
      <div className="btn__container">
        <Instruction instructions={instructions} />
        <Button
          className="btn--auth"
          onClick={() => {
            showAuthPage(URL);
          }}
          size={SIZE.compact}
          overrides={btnOverride}
        >
          Authorize
        </Button>
      </div>
    </>
  );
};

export default JiraAuth;
