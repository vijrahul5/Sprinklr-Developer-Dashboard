//libraries
import React from "react";
import { useState, useCallback } from "react";
//utils
import { Input, SIZE } from "baseui/input";
import { Button } from "baseui/button";
import Instruction from "../../instruction/index";

const GitlabAccessTokenForm = (props) => {
    const [accessToken, setAccessToken] = useState("");
    const setToken = useCallback(
        (e) => {
            setAccessToken(e.target.value);
        },
        [accessToken]
    );
    const submitToken = useCallback(() => {
        props.submitToken(accessToken);
    }, [accessToken, props]);
    const overRides = {
        Root: {
            style: () => ({
                borderRadius: "4px",
                marginTop: "0.8rem",
            }),
        },
    };
    return (
        <div data-testid="form">
            <Instruction
                instructions={[
                    "Login to your Gitlab account.",
                    "Select your Gitlab icon and open Preferences.",
                    "Select access token in User settings.",
                    "Write token name in the input box.",
                    "Select scope as API and click on 'Create Access Token'.",
                    "Now use submit this token here in order to use the dashboard for Gitlab.",
                ]}
            />
            <Input
                type="text"
                value={accessToken}
                placeholder="Please Enter Access Token"
                onChange={setToken}
                overrides={overRides}
            />
            <Button
                onClick={submitToken}
                className="btn--auth btnCustom mt1"
                size={SIZE.compact}
                data-testid="btn"
            >
                Submit Token
            </Button>
        </div>
    );
};

export default GitlabAccessTokenForm;
export { Button };
