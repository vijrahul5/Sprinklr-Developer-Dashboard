import { React, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "baseui/button";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    const handleClick = useCallback(() => {
        logout();
    }, []);
    return (
        isAuthenticated && (
            <Button onClick={handleClick} className="gitlab">
                Log Out
            </Button>
        )
    );
};

export default LogoutButton;
