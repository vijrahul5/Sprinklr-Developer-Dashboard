import { React, useEffect, useState, useCallback } from "react";
import { Input } from "baseui/input";
import { Button } from "baseui/button";

const axios = require("axios");
const GitlabAccessTokenForm = (props) => {
    const [accessToken, setAccessToken] = useState("");
    const setToken = (e) => {
        setAccessToken(e.target.value);
    };
    const submitToken = useCallback(() => {
        props.submitToken(accessToken);
    }, []);
    return (
        <>
            <div>
                <h1>Steps you should follow to Use Gitlab</h1>
                <br></br>
                <h3>1. Login to your gitlab Account</h3>
                <h3>2. Select your gitlab icon and open preferences</h3>
                <h3>3. Select Access Token in User Settings</h3>
                <h3>4. Write token name in the input box</h3>
                <h3>
                    5. Select scope as api and just click on create accessToken
                </h3>
                <h3>6. Now use this token to use our dashboard</h3>
            </div>
            <br></br>
            <Input
                type="text"
                placeholder="pleaseEnterAccesToken"
                onChange={setToken}
            />
            <br></br>
            <Button onClick={submitToken}>SubmitToken</Button>
        </>
    );
};

export default GitlabAccessTokenForm;
