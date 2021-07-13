import React from "react";
import { useState, useCallback } from "react";
import { Input, SIZE } from "baseui/input";
import { Button } from "baseui/button";
import Instruction from "../instruction/Instruction";

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
        <>
            <Instruction
                instructions={[
                    "Login to your gitlab account.",
                    "Select your gitlab icon and open preferences.",
                    "Select access token in user settings.",
                    "Write token name in the input box.",
                    "Select scope as API and just click on create access token.",
                    "Now use this token to use our dashboard.",
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
            >
                Submit Token
            </Button>
        </>
    );
};

export default GitlabAccessTokenForm;
