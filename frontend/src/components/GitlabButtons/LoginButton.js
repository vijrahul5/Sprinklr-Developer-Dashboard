import { React, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "baseui/button";
const LoginButton = (props) => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    console.log(loginWithRedirect);
    console.log(isAuthenticated);
    const handleClick = useCallback(() => {
        loginWithRedirect();
    }, []);
    return (
        !isAuthenticated && (
            <div id="start-div">
                <h2>Connect to Gitlab</h2>
                <Button onClick={handleClick}>Log In</Button>
            </div>
        )
    );
};
export default LoginButton;
