import React from "react";
import { Button, SIZE } from "baseui/button";

import useAuthorize from "./useAuthorize";

require("dotenv").config();

const clientId = process.env.REACT_APP_CLIENT_ID_JIRA;
const URL = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${clientId}&scope=offline_access%20read%3Ajira-user%20read%3Ajira-work%20manage%3Ajira-project%20manage%3Ajira-configuration%20write%3Ajira-work%20manage%3Ajira-webhook%20manage%3Ajira-data-provider&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&state=jiiaa&response_type=code&prompt=consent`;

const JiraAuth = () => {
    const { showAuthPage } = useAuthorize();

    return (
        <>
            <ul className="instruction">
                <li className="instruction__item">
                    1. Click on 'Authorize' for Jira Authorization.
                </li>
                <li className="instruction__item">
                    2. It will redirect to Jira permission page.
                </li>
                <li className="instruction__item">
                    3. Select account and domain and click allow.
                </li>

                <li className="instruction__item">
                    4. Now you can get issues based on filters and JQL.
                </li>
            </ul>
            <div className="btn__container">
                <Button
                    className="btn--auth"
                    onClick={() => {
                        showAuthPage(URL);
                    }}
                    size={SIZE.compact}
                    overrides={{
                        Root: {
                            style: ({ $theme }) => ({
                                borderRadius: "4px",
                            }),
                        },
                    }}
                >
                    Authorize
                </Button>
            </div>
        </>
    );
};

export default JiraAuth;
