import React, { useEffect } from "react";
import Loader from "../../globalComponents/Loader/Tombstone";
import { useFetchEmployeeData, useRequestManagerAccess } from "./profileHooks";
import { Button, SIZE } from "baseui/button";
import NotificationManager from "react-notifications/lib/NotificationManager";

function Profile() {
    const [loading, data, error] = useFetchEmployeeData(); // Fetches employee data using a custom hook
    const [requestError, requestManagerAccess] = useRequestManagerAccess();

    useEffect(() => {
        if (error) NotificationManager.error("Error!", error, 5000);
    }, [error]);

    useEffect(() => {
        if (requestError)
            NotificationManager.error("Error!", requestError, 5000);
    }, [requestError]);

    if (loading) {
        return (
            <div className="profile">
                <Loader />
            </div>
        );
    }
    return (
        <>
            <div className="basicInfo__wrapper">
                <div className="profile">
                    <div className="profile__imgHolder">
                        <img src={data.picture} alt="" />
                    </div>
                    <ul>
                        <li>
                            <p className="profile__param">Name:</p>
                            <p className="profile__value">{data.name}</p>
                        </li>
                        <li>
                            <p className="profile__param">Email:</p>
                            <p className="profile__value">{data.email}</p>
                        </li>
                        <li>
                            <p className="profile__param">Reports to:</p>
                            <p className="profile__value">
                                {data.manager ? data.manager.email : "None"}
                            </p>
                        </li>
                    </ul>
                </div>
                {data.managerAccess === false ? (
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
