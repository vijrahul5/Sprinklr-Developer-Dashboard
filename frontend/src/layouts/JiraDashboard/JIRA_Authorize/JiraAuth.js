import React from "react";
import useAuthorize from "./useAuthorize";
import { Button, SIZE } from "baseui/button";
import { Heading, HeadingLevel } from "baseui/heading";
require("dotenv").config();
const clientId = process.env.REACT_APP_CLIENT_ID_JIRA;
const URL = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${clientId}&scope=offline_access%20read%3Ajira-user%20read%3Ajira-work%20manage%3Ajira-project%20manage%3Ajira-configuration%20write%3Ajira-work%20manage%3Ajira-webhook%20manage%3Ajira-data-provider&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&state=jiiaa&response_type=code&prompt=consent`;
const JiraAuth = () => {
    const { showAuthPage, setupJira } = useAuthorize();

    return (
        <div id="jiraAuth">
            <HeadingLevel>
                <Heading
                    style={{
                        marginBottom: "2rem",
                        textAlign: "center",
                        fontSize: "2rem",
                        fontWeight: "250",
                    }}
                >
                    Jira Authorization
                </Heading>
            </HeadingLevel>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button
                    onClick={() => {
                        showAuthPage(URL);
                    }}
                    size={SIZE.compact}
                    className="btnCustom"
                >
                    Authorize
                </Button>

                <Button
                    onClick={setupJira}
                    style={{ marginLeft: "1rem" }}
                    size={SIZE.compact}
                    className="btnCustom"
                >
                    Save
                </Button>
            </div>
        </div>
    );
};

export default JiraAuth;
