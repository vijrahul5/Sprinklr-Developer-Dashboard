// libraries
import React, { useCallback } from "react";
import { Button, SIZE } from "baseui/button";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
// utilities
import Auth from "../../../Auth";
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
                    {user.managerAccess === false ? (
                        <div
                            className="managerAccess"
                            onClick={handleClick}
                        >
                            <h2>Request Manager Access</h2>
                        </div>
                    ) : null}
                    <Link
                        to="/"
                        onClick={() => Auth.logout()}
                        className="profile__signOut__link"
                    >
                        <div className="profile__signOut">
                            <h1>Sign Out</h1>
                            <FaSignOutAlt className="profile__signOut__icon"></FaSignOutAlt>
                        </div>
                    </Link>
                </ul>
            </div>
        </>
    );
}

export default Profile;
