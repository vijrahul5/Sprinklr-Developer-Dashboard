import { React, useState, useCallback } from "react";
import { Input, SIZE } from "baseui/input";
import { Button } from "baseui/button";

const GitlabAccessTokenForm = (props) => {
    const [accessToken, setAccessToken] = useState("");
    const setToken = (e) => {
        setAccessToken(e.target.value);
    };
    const submitToken = useCallback(() => {
        props.submitToken(accessToken);
    }, [accessToken, props]);
    return (
        <>
            <ul className="instruction">
                <h2 className="instruction__item">
                    1. Login to your gitlab Account
                </h2>
                <h2 className="instruction__item">
                    2. Select your gitlab icon and open preferences
                </h2>
                <h2 className="instruction__item">
                    3. Select Access Token in User Settings
                </h2>
                <h2 className="instruction__item">
                    4. Write token name in the input box
                </h2>
                <h2 className="instruction__item">
                    5. Select scope as api and just click on create accessToken
                </h2>
                <h2 className="instruction__item">
                    6. Now use this token to use our dashboard
                </h2>
            </ul>
            <Input
                type="text"
                value={accessToken}
                placeholder="Please Enter Access Token"
                onChange={setToken}
                overrides={{
                    Root: {
                        style: ({ $theme }) => ({
                            borderRadius: "4px",
                            marginTop:"1.5rem"
                        }),
                    },
                }}
            />
            <div className="btn__container">
                <Button
                    onClick={submitToken}
                    className="btn--auth btnCustom"
                    size={SIZE.compact}
                >
                    Submit Token
                </Button>
            </div>
        </>
    );
};

export default GitlabAccessTokenForm;
