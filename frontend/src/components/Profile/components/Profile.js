// libraries
import React, { useCallback } from "react";
import { Button, SIZE } from "baseui/button";
// hooks
import useRequestManagerAccess from "../hooks/useRequestManagerAccess";

function Profile({ user }) {
    const [requestError, requestManagerAccess] = useRequestManagerAccess();

    const handleClick = useCallback(
        (e) => {
            requestManagerAccess();
        },
        [requestManagerAccess]
    );
    return (
        <>
                <div className="profile">
                    <div className="profile__imgHolder">
                        <img src={user.picture} alt="" />
                    </div>
                    <ul>
                        <li>
                            <p className="profile__param">Name:</p>
                            <p className="profile__value">{user.name}</p>
                        </li>
                        <li>
                            <p className="profile__param">Email:</p>
                            <p className="profile__value">{user.email}</p>
                        </li>
                        <li>
                            <p className="profile__param">Reports to:</p>
                            <p className="profile__value">
                                {user.manager ? user.manager.email : "None"}
                            </p>
                        </li>
                    </ul>
                    {user.managerAccess === false ? (
                            <Button
                                type="submit"
                                className="submit btnCustom--tertiary"
                                size={SIZE.mini}
                                onClick={handleClick}
                            >
                                Request Manager Access
                            </Button>
                    ) : null}
                </div>
        </>
    );
}

export default Profile;
