import React, { useEffect } from "react";
import Loader from "../../loaders/Tombstone";
import useFetchEmployeeData from "../../../hooks/useFetchEmployeeData";
import useRequestManagerAccess from "../hooks/useRequestManagerAccess";
import { Button, SIZE } from "baseui/button";

function Profile({user}) {
    const [requestError, requestManagerAccess] = useRequestManagerAccess();
    
    return (
        <>
            <div className="basicInfo__wrapper">
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
                </div>
                {user.managerAccess === false ? (
                    <div className="requestForm">
                        <Button
                            type="submit"
                            className="submit btnCustom"
                            size={SIZE.compact}
                            onClick={(e) => {
                                requestManagerAccess();
                            }}
                        >
                            Request Manager Access
                        </Button>
                    </div>
                ) : null}
            </div>
        </>
    );
}

export default Profile;
